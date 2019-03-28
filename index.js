/**
 * The render System
 */
const fs = require('fs')
const path = require('path')
const Liquid = require('liquidjs')
const http = require('http')
const reload = require('express-reload')
const app = require('./_visualRender')
const server = http.createServer(app)
const R = require('ramda')

const appConfig = require('./appConfig.js')

const GLOBAL_STUBS = require('./stubs')

// const stubbedOptions = require('./stubs/select.json')

// @todo move to config
const port = 3000

// Liquid Engine
const engine = new Liquid({ root: path.resolve(__dirname, './src/snippets/'), extname: '.liquid' })

// express config
app.engine('liquid', engine.express())
// app.set('views', path.resolve(__dirname, './src'))
app.set('view engine', 'liquid')
// View Folders
app.set('views', [
    path.resolve(__dirname, './src/_docs'), 
    path.resolve(__dirname, './src/_loaders'), 
    path.resolve(__dirname, './src/_global'), 
    path.resolve(__dirname, './src/_enhancers'), 
    path.resolve(__dirname, './src/_tales'), 
    path.resolve(__dirname, './src/layout'), 
    path.resolve(__dirname, './src/templates'), 
    path.resolve(__dirname, './src/snippets'),
    path.resolve(__dirname, './src/sections'),
  ]
)

// File Finder
const getFileList = (path) => {
  let arr = []
  const files = fs.readdirSync(path)
  files.map(file => {
    const fileName = file.replace('.liquid', '')
    arr.push(fileName)
  })
  return arr
}

// data
// const snippets = Object.keys(GLOBAL_STUBS)
const snippets = getFileList(path.resolve(__dirname, './src/snippets'))
const sections = getFileList(path.resolve(__dirname, './src/sections'))
const layout = getFileList(path.resolve(__dirname, './src/layout'))
const templates = getFileList(path.resolve(__dirname, './src/templates'))

// Tales
const tales = getFileList(path.resolve(__dirname, './src/_tales'))

const appData = (req) => R.mergeAll([
  { appConfig : appConfig, 
    nav: {
      tales: tales, 
      templates: templates, 
      layouts: layout, 
      sections: sections, 
      snippets : snippets,
    }, 
    params: req.params
  }, GLOBAL_STUBS])

// indexView
app.get(`/`, function (req, res) { res.render( 'preview_index', R.merge(appData(req), {root: true}))})
app.get(`/qv/:target`, function (req, res) { res.render( 'preview_index', appData(req))})
app.get(`/tales/:target`, function (req, res) { res.render( 'preview_index', appData(req))})
app.get(`/:target`, function (req, res) { res.render( 'mock_theme', appData(req))})

// Snippets
// app.set('views', path.resolve(__dirname, './src/snippets'))
// snippets.map((view) => {
//   app.get(`/${view}`, function (req, res) { res.render(view, R.merge({params: rew.params},GLOBAL_STUBS))})
// })

// Listen / Reload
server.listen(port, () => console.log(`Server listening on port: ${port} : http://localhost:${port}`))

// console.log(`## QUICK ACCESS ##
//   ${snippets.map(i => )}
//   Select: http://localhost:${port}/select
// `)