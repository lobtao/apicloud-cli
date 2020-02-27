# ys-apicloud-cli 工具使用说明

## 简介

* 操作系统: Mac/Windows/Linux
* nodejs环境: node 4+
* 开源协议: GPL-3.0

[APICloud](http://www.apicloud.com/) 提供的一款适用于终端/命令行的 *APICloud* 平台开发工具,基于 [apicloud-tools-core 核心开发库](https://www.npmjs.com/package/apicloud-tools-core) 开发,包含新建页面模板,新建应用模板,WiFi同步等核心功能等核心库已有功能.

开源地址: [https://github.com/lobtao/ys-apicloud-cli](https://github.com/lobtao/apicloud-cli)

## 安装

### 稳定版安装:

```sh
npm install -g ys-apicloud-cli
```

### 体验版安装(或许有彩蛋):

```sh
npm install -g ys-apicloud-cli@dev
```

## 开启 es6 支持

```sh
apicloud polyfill --project ./
```

从 **0.2.0** 版本开始, *apicloud-cli* 支持对 APICloud 项目进行 *polyfill* 操作,以直接在项目中使用 es6 等最新语法,优雅地进行模块化的混合App开发.详见: [apicloud-polyfill](https://www.npmjs.com/package/apicloud-polyfill)

## 使用自定义指令

从 **0.2.0** 版本开始, *apicloud-cli* 新建 **run** 指令,用于执行用户自定义的指令.项目本身必须进行 polyfill 操作后,才可使用此特性.内部实现基于 npm 包配置文件的 scripts 属性,详见: [Using a package.json](https://docs.npmjs.com/getting-started/using-a-package.json)

## apicloud-cli 指令集

```

  ***************** APICloud 通用命令行开发工具 ***********************

  命令格式

  执行全局方法:
  apicloud 方法名 --参数名1 参数值2 --参数名2 参数值2

  执行项目相关的方法:
  apiclud run 方法名

  注意:
  1. 参数中的workspace,project和file,可以是相对路径或绝对路径
  2. 支持的应用模板有: default,bottom,home,slide
  3. 支持的页面模板有: page001,page002,page003,page004,page005,page006,page007,page008,page009,page010,page011,page012,page013,page014,page015,page016,page017,page018,page019,page020,page021,page022,page023,page024,page025,page026
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
```

## 注意

*apicloud wifiStart* 或 *apicloud wifiLog* 会持续输出操作日志或调试日志,此时无法继续进行输入,请在另一个终端/命令行窗口中继续进行操作;在真实的场景中,终端使用者,是可以通过特定指令使此指令后台执行,或重定向标准输出流.
