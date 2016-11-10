const CLI = require("../src/cli-core.js")
const path = require("path")

const argv = require('minimist')(process.argv.slice(2))

if(argv.v || argv.version){
  argv._ = ["version"]
}

try{
  const method = argv._[0]

  delete argv._
  /* workspace,project和file,可以是相对路径或绝对路径 ==> 入口处兼容转换为绝对路径. */
  if(argv.workspace){
    argv.workspace = path.resolve(argv.workspace)
  }

  if(argv.project){
    argv.project = path.resolve(argv.project)
  }

  if(argv.file){
    argv.file = path.resolve(argv.file)
  }

  CLI[method](argv)
}catch(err){
  console.log(err)
  CLI["help"](argv)
}
