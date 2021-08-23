// NOTE: We compile ES6 on the server at runtime, but not this module.
console.log("<server.js{enter}>")
require('babel-core/register');
console.log("babl_reg")
var throng = require('throng');
var start = require('./app').start;
var config = require('./app/config');
(function(){
console.log("<server.js{got_config}>");
if (require.main === process.mainModule&&require.main===module) {
console.log("started_mod",global.started??false)
global.started=true
  console.log("is_main_mod",require.main === process.mainModule,require.main===module,typeof process.mainModule)
  process.mainModule=function(){};
  throng(start, {
    workers: config.workers,
    lifetime: Infinity,
  });
}else{
console.log(require.main);
}
})()
console.log("<server.js{end}>")
