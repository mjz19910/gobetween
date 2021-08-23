import express from 'express'
import bootstrap from './bootstrap'

export function start() {
  let app = express()
  app = bootstrap(app, express)
  console.log("<app/index.js{start}>",new Error().stack)
  let server = app.listen(app.get('port'), function() {
    console.log('<app/index.js{start/app.listen{cb}}> Serving from port ' + app.get('port'),new Error().stack)
  })
}
