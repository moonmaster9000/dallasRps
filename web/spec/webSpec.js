const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {message: ""}
    }

    handleSubmit(){
        this.props.requests.play("p1 throw placeholder", "p2 throw placeholder", this)
    }

    invalid(){
        this.setState({message: "INVALID"})
    }

    tie(){
        this.setState({message: "TIE"})
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
        beforeEach(function () {
            let requests = {
                play(p1Throw, p2Throw, ui){ ui.invalid() }
            }

            render(requests)
        })

        it("displays 'INVALID'", function () {
            expect(page()).not.toContain("INVALID")
            submitForm()
            expect(page()).toContain("INVALID")
        })
    })
    
    describe("when the game module determines the throws are tie", function () {
        beforeEach(function () {
            let requests = {
                play(p1Throw, p2Throw, ui){ ui.tie() }
            }

            render(requests)
        })

        it("displays 'TIE'", function () {
            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })
    })

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "hello"
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
        return domFixture.innerText;
    }

    function submitForm() {
        domFixture.querySelector("button").click()
    }

    function render(requests) {
        ReactDOM.render(<PlayForm requests={requests}/>, domFixture)
    }
})








