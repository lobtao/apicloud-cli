const APICloud = require("apicloud-tools-core")
const {exec} = require('child_process')
const WebSocket = require('ws')
const fs = require("fs")
const path = require('path')
const spawn = require('cross-spawn');

import Polyfill from "apicloud-polyfill"

const SOCKET_IP = "localhost"
const CLI_COMMAND = - 1

const cli = {
  version({}){
    let packageJSONPath = path.resolve(__dirname,"../package.json")
    fs.readFile(packageJSONPath, 'utf8', (err,data)=>{
      let packageJSON = JSON.parse(data)
      console.log(`apicloud-cli: ${packageJSON.version}`)
    })
  },
  help({}){
    let info = `
  ***************** APICloud 通用命令行开发工具 ***********************

  命令格式

  执行全局方法:
  apicloud 方法名 --参数名1 参数值2 --参数名2 参数值2

  执行项目相关的方法:
  apiclud run 方法名

  注意:
  1. 参数中的workspace,project和file,可以是相对路径或绝对路径
  2. 支持的应用模板有: ${Object.keys(APICloud.appTemplateConfig())}
  3. 支持的页面模板有: ${Object.keys(APICloud.fileTemplateConfig())}
  4. port 为wifi服务启动时的端口号
  5. 使用 apicloud run 执行项目相关的方法时,应先cd切换到项目根目录
  6. 项目相关的方法,仅在项目有效 polyfill 化以后,才有效

  // ============================================================
  全局命令示例

  显示版本号:
  apicloud version 或 apicloud -v 或 apicloud --version

  显示帮助信息:
  apicloud help

  启动 wifi 服务:
  apicloud wifiStart --port 8686

  停止 wifi 服务:
  apicloud wifiStop --port 8686

  wifi 增量更新:
  apicloud wifiSync --project ./ --updateAll false --port 8686

  wifi 全量更新:
  apicloud wifiSync --project ./ --updateAll true --port 8686

  wifi 预览:
  apicloud wifiPreview --file ./index.html --port 8686

  获取 wifi 信息:
  apicloud wifiInfo --port 8686

  获取 wifi 调试日志:
  apicloud wifiLog --port 8686

  创建应用模板:
  apicloud init --name HelloAPICloud --template home --workspace ./

  创建页面模板:
  apicloud initPage --name first_page --template page001 --project ./

  开启 es6 支持:
  apicloud polyfill --project ./

  // ============================================================

  项目相关方法示例

  wifi 增量真机同步:
  apicloud run sync

  预编译 es6/es7 js文件:
  apicloud run bundle

  预编译 es6/es7 js文件,然后进行wifi 增量真机同步:
  apicloud run bundle_s

  以debug模式,预编译 es6/es7 js文件,此时会产生对应的 *.map.js 文件,便于在浏览器中调试:
  apicloud run bundle_d

  以debug模式,预编译 es6/es7 js文件,然后进行wifi 增量真机同步:
  apicloud run bundle_d_s
    `

    console.log(info)
  },
  wifiStart({port=8686}){ /*
     相对于在本地开启了一个 http+socker 混合服务器,cli使用者可以在终端查看各种输出.
    */
    APICloud.startWifi({port:port})
  },
  wifiStop({port=8686}){ /* 停止wifi */
    var socket = new WebSocket(`ws://${SOCKET_IP}:${port}`)

    socket.on('open', function open() {
      let msg = {
                  command: CLI_COMMAND,
                  payload:{
                    method: "wifiStop",
                    params: {}
                  }
                }
      socket.send(JSON.stringify(msg));
    });
  },
  wifiSync({project="./",updateAll=true,port=8686}){
    var socket = new WebSocket(`ws://${SOCKET_IP}:${port}`)

    socket.on('open', function open() {
      let msg = {
                  command: CLI_COMMAND,
                  payload:{
                    method: "wifiSync",
                    params: {project:project,updateAll:updateAll}
                  }
                }
      socket.send(JSON.stringify(msg));
    });
  },
  wifiPreview({file="./index.html",port=8686}){
    var socket = new WebSocket(`ws://${SOCKET_IP}:${port}`)

    socket.on('open', function open() {
      let msg = {
                  command: CLI_COMMAND,
                  payload:{
                    method: "wifiPreview",
                    params: {file:file}
                  }
                }
      socket.send(JSON.stringify(msg))
    }
    )
  },
  wifiInfo({port=8686}){
    var socket = new WebSocket(`ws://${SOCKET_IP}:${port}`)

    socket.on('open', function open() {
      let msg = {
                  command: CLI_COMMAND,
                  payload:{
                    method: "wifiInfo",
                    params: {}
                  }
                }
      socket.send(JSON.stringify(msg))
    })

    socket.on("message",(message)=>{
      let receiveMsg = JSON.parse(message)
      const {payload,command} = receiveMsg
      if(CLI_COMMAND === command){
        console.log(JSON.stringify(payload))
      }
    })
  },
  wifiLog({port=8686}){
    var socket = new WebSocket(`ws://${SOCKET_IP}:${port}`)

    socket.on('open', function open() {
      let msg = {
                  command: CLI_COMMAND,
                  payload:{
                    method: "wifiLog",
                    params: {}
                  }
                }
      socket.send(JSON.stringify(msg))
    })

    socket.on("message",(message)=>{
      let receiveMsg = JSON.parse(message)
      const {payload,command} = receiveMsg
      if(CLI_COMMAND === command){
        console.log(JSON.stringify(payload))
      }
    })
  },
  init({name="HelloAPICloud",template="home",workspace="./"}){
    APICloud.init({
      name:name,template:template,output:workspace
    })
  },
  initPage({name="first_page",template="page001",project="./"}){
    APICloud.addFileTemplate({
      name:name,template:template,output:project
    })
  },
  polyfill({project="./"}){
    Polyfill({project:project})
  },
  run({argv}){
    argv.shift()
    argv.shift()
    spawn('npm', argv,{stdio:"inherit"})
  }
}

module.exports = cli
