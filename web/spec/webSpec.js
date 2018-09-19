const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {message: ""}
    }

    handleSubmit(){
        this.setState({message: "INVALID"})
    }

    render(){
        return <div>
            {this.state.message}
            <button onClick={this.handleSubmit.bind(this)}>PLAY</button>
        </div>
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

            expect(domFixture.innerText).not.toContain("INVALID")
            domFixture.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")

            domFixture.remove()
        })
    })
})








