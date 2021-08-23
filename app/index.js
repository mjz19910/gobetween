import express from 'express';
import bootstrap from './bootstrap';
const dropped=[];
function rust_drop(value){
  // prepare for drop
  dropped.push(value);
  // drop the value
  {
    value=dropped.pop();
  }
}

function log_src_filter(src,...rest){
  let arg0=rest[0];
  if(typeof arg0=='string'){
    rest[0]=src+' '+arg0;
  }else{
    return [src,...rest];
  }
  return rest;
}

export function start() {
  let app = express();
  let log_src="<app/index.js{start}>";
  app = bootstrap(app, express);
  console.log(log_src,new Error().stack);
  let server = app.listen(app.get('port'), function() {
    let listen_port=app.get('port');
    let err={};
    if(Error.captureStackTrace){
      Error.captureStackTrace(err);
    }else{
      let tmp=new Error();
      err.stack=tmp.stack;
    }
    let cur_stack=err.stack;
    let log_src='<app/index.js{start/app.listen{cb}}>';
    console.log(...log_src_filter(log_src,'Serving from port ' + listen_port,cur_stack));
  });
  rust_drop(server);
}
