const path = require('path')
const Liquid = require('liquidjs')
const engine = new Liquid({
  root: path.resolve(__dirname, '../liquidComponents/'), 
  extname: '.liquid' 
})



// console.log(engine)

const stubbedOptions = {
  "title": "Some Test title",
  selectOptions : [
    {val: 1, name: "One"},
    {val: 2, name: "Two"},
    {val: 3, name: "Three"},
    {val: 4, name: "Four"},
  ]
}



describe('Render a select snippet', () => {

  /**
   * Tests that the select renders
   */

  test('Does it render?', async () => {
  
    const doc = document.body.innerHTML = `<div id="stage"></div>`
    const stage = document.getElementById('stage')

    const renderedComponent = await engine.renderFile("select", stubbedOptions)
      .then(component => {
          stage.innerHTML = component
        }
      )
      .catch(e => {throw e})

    // title Renders
    const title = document.querySelector('#stage h1')
    expect(title.innerHTML).toEqual(stubbedOptions.title)

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

    const renderedComponent = await engine.renderFile("select", stubbedOptions)
      .then(component => {
          stage.innerHTML = component
        }
        )
        .catch(e => {throw e})
      expect(document.body.innerHTML).toMatchSnapshot()

  })

})

