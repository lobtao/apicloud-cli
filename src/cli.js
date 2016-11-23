const CLI = require("../src/cli-core.js")
const path = require("path")

let argv = require('minimist')(process.argv.slice(2))

if(argv.v || argv.version){
  argv._ = ["version"]
}

try{
  const method = argv._[0]
  if (method ==="run") {

    argv = {argv:process.argv}
  }else{
    delete argv._

    /* workspace,project和file,可以是相对路径或绝对路径 ==> 入口处兼容转换为绝对路径. */
    argv.workspace = path.resolve((argv.workspace|| "./")+"")
    argv.project = path.resolve((argv.project|| "./")+"")
    argv.file = path.resolve((argv.file || "./index.html")+"")
  }

  CLI[method](argv)
}catch(err){
  console.log(err)
  console.log(`您可以输入 apicloud help 获取更多帮助信息...`)
}
