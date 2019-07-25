// JSON
const select = require('./select.json')
const collections = require('./collections.json')
const collection = require('./collection.json')
const product = require('./product.json')
const page = require('./page.json')
const form = require('./forms.json')

// STUBS OBJECT
const GLOBAL_STUB = {
  collection: collection,
  collections: collections,
  product: product,
  select: select,
  page: page
}

module.exports = GLOBAL_STUB