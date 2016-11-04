const CLI = require("../src/cli-core.js")

const argv = require('minimist')(process.argv.slice(2))

if(argv.v || argv.version){
  argv._ = ["version"]
}

try{
  const method = argv._[0]

  delete argv._

  CLI[method](argv)
}catch(err){
  console.log(err)
  CLI["help"](argv)
}
