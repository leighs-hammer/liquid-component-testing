# Liquid component testing

A proof of concepts to render liquid components ( snippets ) using a stub of data via node. 
Allowing for a pseudo unit testing style of testing against minor fragments of shopify
store UI's. 

1. Renders and test pass through of data 
2. Tree snapshot comparison for DOM structural changes
3. Visual regression testing with image comparison of rendered output.


At its most basic level this is purely a proof of concept the limitations of
node rendering liquid, filters etc etc will probably become apparent with further exploration. 

To view a hurried and rather nasty test file to validate the concept, 

`./tests/select.test`

To get the system up: 

1. `npm install` ( tested on node@11 +)
2. 'npm run test` or `npm run test:watch`

That will cycle through a test of the `./src/snippets/select.liquid` file. 

if you would like to view that file.

1. `npm run serve`

then visit: http://localhost:3300/select

## Testing the system out

1. `npm run test:watch`
2. make some changes in the `select.liquid` file and failures will occur
3. updating the snapshots should be as simple as hitting `u` in your terminal with jest running. 

