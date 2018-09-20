const React = require("react")
const ReactDOM = require("react-dom")

var domFixture

function setupDOM() {
    domFixture = document.createElement("div")
    document.body.appendChild(domFixture)
}

beforeEach(function () {
    setupDOM()
})

function cleanUpDOM() {
    domFixture.remove()
}

afterEach(function () {
    cleanUpDOM()
})

function page() {
    return domFixture.innerText
}

function renderComponent(component){
    ReactDOM.render(
        component,
        domFixture
    )
}

window.page = page
window.renderComponent = renderComponent
window.domFixture = domFixture