const express = require('express')
const app = express()
// possibly move server spool up here

// Assets
app.use(express.static('./src/assets'))

module.exports = app