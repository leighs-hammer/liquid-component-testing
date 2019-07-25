/** 
 * Visually tesats for regression in existing buttons
 * 
 */

const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')


describe("Tests buttons & their usage", () => {

   /**
   * Visually Test the buttons in base state
   */
  test('Visually Test the select', async (done) => {

    // render the component at root
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({width: 1440, height: 900})
    await page.goto('http://localhost:3000/button-usage')
    const screenshot = await page.screenshot().then(image => image)
    
    // visual test extend
    expect.extend({ toMatchImageSnapshot })
    expect(screenshot).toMatchImageSnapshot()

    // clear out
    await browser.close()
    done()
    
  })
})