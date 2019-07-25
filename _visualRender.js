const express = require('express')
const app = express()
// possibly move server spool up here

// Assets
app.use("/themeAssets", express.static('./build/assets'))
app.use("/talesAssets", express.static('./tales/_assets'))
app.use("/", express.static('./tales/_assets'))
app.use("/reports", express.static('./tales/_reports'))

module.exports = app