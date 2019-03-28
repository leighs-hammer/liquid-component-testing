/**
 * Proof of concept to unit test A Shopify Liquid component
 * The limitations are pretty drastic but the concept should
 * be viable. 
 * 
 * Test render -> evaluating values
 * Test Snapshot -> Evaluates the dom tree 
 * Test Visual -> 
 * 
 */

const path = require('path')
const Liquid = require('liquidjs')

const http = require('http')
const app = require('../_visualRender')
const puppeteer = require('puppeteer')

const GLOBAL_STUBS = require('../stubs/index')


const { toMatchImageSnapshot } = require('jest-image-snapshot')

const server = http.createServer(app)

// Simulating shopify data passed into a component ( ./src/snippets/select.liquid )
const engine = new Liquid({
  root: path.resolve(__dirname, '../src/snippets/'), 
  extname: '.liquid' 
})

// express config
app.engine('liquid', engine.express()); // register liquid engine
app.set('views', path.resolve(__dirname, '../src/snippets/'));            // specify the views directory
app.set('view engine', 'liquid'); 


// stubbed data for the liquid render
const stubbedOptions = require('../stubs/select.json')



describe('Render a select snippet', () => {

  afterEach(() => {
    console.log('closing server')
    server.close()
  })
  /**
   * Tests that the select renders
   */

  test('Does it render?', async () => {
  
    const doc = document.body.innerHTML = `<div id="stage"></div>`
    const stage = document.getElementById('stage')

    const renderedComponent = await engine.renderFile("select", GLOBAL_STUBS)
      .then(component => {
          stage.innerHTML = component
        }
      )
      .catch(e => {throw e})

    // title Renders
    const title = document.querySelector('#stage h1')
    console.log(GLOBAL_STUBS.select.title)
    expect(title.innerHTML).toEqual(GLOBAL_STUBS.select.title)

    const optionsList = document.querySelectorAll(`#stage select option`)
    // check node list length
    expect(optionsList.length).toEqual(4)
    // check values
    expect(optionsList[0].value).toEqual("1")
    // check Option names
    expect(optionsList[0].innerHTML).toEqual("One")

  })

  /**
   * Tests against a snapshot
   */
  test('DOM snapshot should match', async () => {
  
    const doc = document.body.innerHTML = `<div id="stage"></div>`
    const stage = document.getElementById('stage')

    const renderedComponent = await engine.renderFile("select", GLOBAL_STUBS)
      .then(component => {
          stage.innerHTML = component
        }
        )
        .catch(e => {throw e})
      expect(document.body.innerHTML).toMatchSnapshot()

  })

  /**
   * Visually Test the dom against snapshot
   * This is a heavy weight test and as such should be used
   * sparingly for specific purpose.
   */
  test('Visually Test the select', async (done) => {

    // render the component at root
    app.get('/select', function (req, res) { res.render("select", )})
    server.listen(3300)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({width: 1440, height: 900})
    await page.goto('http://localhost:3300/select')
    const screenshot = await page.screenshot().then(image => image)
    
    // visual test extend
    expect.extend({ toMatchImageSnapshot })
    expect(screenshot).toMatchImageSnapshot()

    // clear out
    await browser.close()
    done()
    
  })

})