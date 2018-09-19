const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    render(){
        return <button>Hello World!</button>
    }
}

describe("play form", function () {
    describe("when the game module determines the throws are invalid", function () {
        it("displays 'INVALID'", function () {
            let domFixture = document.createElement("div")
            domFixture.id = "hello"
            document.body.appendChild(domFixture)

            let requests = {
                play(p1Throw, p2Throw, ui){ ui.invalid() }
            }

            ReactDOM.render(<PlayForm requests={requests}/>, domFixture)

            domFixture.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })
    })
})