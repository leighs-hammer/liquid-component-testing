/**
 * Grabs all tales and tests them all visually
 */

const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

// @todo move to module
const getFileList = (path) => {
  let arr = []
  const files = fs.readdirSync(path)
  files.map(file => {
    const fileName = file.replace('.liquid', '')
    arr.push(fileName)
  })
  return arr
}
const tales = getFileList(path.resolve(__dirname, '../_tales'))


describe("Grab all tales and visually test them!", () => {
  tales.forEach((tale) => {
    test(`Desktop: Visually Testing ${tale}`, async (done) => {
      // render the component at root
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({width: 1440, height: 900})
      await page.goto(`http://localhost:3000/${tale}`)
      const screenshot = await page.screenshot().then(image => image)
      
      // visual test extend
      expect.extend({ toMatchImageSnapshot })
      expect(screenshot).toMatchImageSnapshot()

      // clear out
      await browser.close()
      done()
    })
    test(`Tablet: Visually Testing ${tale}`, async (done) => {
      // render the component at root
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({width: 1024, height: 768})
      await page.goto(`http://localhost:3000/${tale}`)
      const screenshot = await page.screenshot().then(image => image)
      
      // visual test extend
      expect.extend({ toMatchImageSnapshot })
      expect(screenshot).toMatchImageSnapshot()

      // clear out
      await browser.close()
      done()
    })
    test(`Tablet: Portrait: Visually Testing ${tale}`, async (done) => {
      // render the component at root
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({width: 767, height: 1024})
      await page.goto(`http://localhost:3000/${tale}`)
      const screenshot = await page.screenshot().then(image => image)
      
      // visual test extend
      expect.extend({ toMatchImageSnapshot })
      expect(screenshot).toMatchImageSnapshot()

      // clear out
      await browser.close()
      done()
    })
    test(`Mobile: Portrait: Visually Testing ${tale}`, async (done) => {
    // render the component at root
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({width: 640, height: 360})
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
})