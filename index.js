/**
 * The preview app
 */
const path = require('path')
const Liquid = require('liquidjs')
const http = require('http')
const app = require('./tests/_visualRender')

// Stubs
const stubbedOptions = require('./stubs/select.json')

const server = http.createServer(app)

const port = 3300

const engine = new Liquid({
  root: path.resolve(__dirname, './liquidComponents/'), 
  extname: '.liquid' 
})

// express config
app.engine('liquid', engine.express())
app.set('views', path.resolve(__dirname, './liquidComponents/'))           // specify the views directory
app.set('view engine', 'liquid')

app.get('/select', function (req, res) { res.render("select", stubbedOptions)})
server.listen(port)
console.log(`Server listening on port: ${port} : http://localhost:${port}`)
console.log(`
  Select: http://localhost:${port}/select
`)