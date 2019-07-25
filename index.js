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

const GLOBAL_STUBS = require('./tales/_stubs')

// const stubbedOptions = require('./tales/_stubs/select.json')

// @todo move to config
const port = 3000

// Liquid Engine
const engine = new Liquid({ root: path.resolve(__dirname, './tales/snippets/'), extname: '.liquid' })

// Tags
engine.registerTag('section', {
  parse: function(tagToken, remainTokens) {
      this.str = tagToken.args; // name
      console.log(this)
  },
  render: function(scope, hash) {
      var str = `section`
      return str
  }
})
engine.registerTag('form', {
  parse: function(tagToken, remainTokens) {
      this.str = tagToken.args; // name
      console.log(this)
  },
  render: function(scope, hash) {
      var str = `<form>`
      return str
  }
})
engine.registerTag('endform', {
  parse: function(tagToken, remainTokens) {
      this.str = tagToken.args; // name
      console.log(this)
  },
  render: function(scope, hash) {
      var str = `</form>`
      return str
  }
})
engine.registerTag('schema', {
  parse: function(tagToken, remainTokens) {
      this.str = tagToken.args; // name
      console.log(this)
  },
  render: function(scope, hash) {
      var str = `<pre>`
      return str
  }
})
engine.registerTag('endschema', {
  parse: function(tagToken, remainTokens) {
      this.str = tagToken.args; // name
      console.log(this)
  },
  render: function(scope, hash) {
      var str = `</pre>`
      return str
  }
})
engine.registerTag('paginate', {
  parse: function(tagToken, remainTokens) {
      this.str = tagToken.args; // name
      console.log(this)
  },
  render: function(scope, hash) {
      var str = `paginate`
      return str
  }
})
engine.registerTag('endpaginate', {
  parse: function(tagToken, remainTokens) {
      this.str = tagToken.args; // name
      console.log(this)
  },
  render: function(scope, hash) {
      var str = `paginate`
      return str
  }
})

// express config
app.engine('liquid', engine.express())
app.set('view engine', 'liquid')



// View Folders
app.set('views', [
    path.resolve(__dirname, './tales/_docs'), 
    path.resolve(__dirname, './tales/_loaders'), 
    path.resolve(__dirname, './tales/_global'), 
    path.resolve(__dirname, './tales/_enhancers'), 
    path.resolve(__dirname, './tales/_tales'), 
    path.resolve(__dirname, './build/layout'), 
    path.resolve(__dirname, './build/templates'), 
    path.resolve(__dirname, './build/snippets'),
    path.resolve(__dirname, './build/sections'),
    path.resolve(__dirname, './build/assets'),
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
const snippets = getFileList(path.resolve(__dirname, './build/snippets'))
const sections = getFileList(path.resolve(__dirname, './build/sections'))
const layout = getFileList(path.resolve(__dirname, './build/layout'))
const templates = getFileList(path.resolve(__dirname, './build/templates'))
const assets = getFileList(path.resolve(__dirname, './build/assets'))

// Tales
const tales = getFileList(path.resolve(__dirname, './tales/_tales'))

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
app.get(`/iframe/:type/:target/`, function (req, res) { res.render( 'iframe_loader', appData(req))})
// app.get(`/reports/:target`, function (req, res) { res.render( 'iframe_loader', appData(req))})

// Snippets
// app.set('views', path.resolve(__dirname, './tales/snippets'))
// snippets.map((view) => {
//   app.get(`/${view}`, function (req, res) { res.render(view, R.merge({params: rew.params},GLOBAL_STUBS))})
// })

// Listen / Reload
server.listen(port, () => console.log(`Server listening on port: ${port} : http://localhost:${port}`))

// console.log(`## QUICK ACCESS ##
//   ${snippets.map(i => )}
//   Select: http://localhost:${port}/select
// `)