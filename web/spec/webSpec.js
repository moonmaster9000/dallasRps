const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {message: ""}
    }

    handleSubmit(){
        this.props.requests.playRound("p1 throw placeholder", "p2 throw placeholder", this)
    }

    invalid(){
        this.setState({message: "INVALID"})
    }

    tie(){
        this.setState({message: "TIE"})
    }

    p1Wins(){
        this.setState({message: "P1 Wins!"})
    }

    p2Wins(){
        this.setState({message: "P2 Wins!"})
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
                playRound(p1Throw, p2Throw, ui){ ui.invalid() }
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
                playRound(p1Throw, p2Throw, ui){ ui.tie() }
            }

            render(requests)
        })

        it("displays 'TIE'", function () {
            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })
    })
    
    describe("when the game module determines the throws are p1Wins", function () {
        beforeEach(function () {
            let requests = {
                playRound(p1Throw, p2Throw, ui){ ui.p1Wins() }
            }

            render(requests)
        })

        it("displays 'P1 Wins!'", function () {
            expect(page()).not.toContain("P1 Wins!")
            submitForm()
            expect(page()).toContain("P1 Wins!")
        })
    })

    describe("when the game module determines the throws are p2Wins", function () {
        beforeEach(function () {
            let requests = {
                playRound(p1Throw, p2Throw, ui){ ui.p2Wins() }
            }

            render(requests)
        })

        it("displays 'P2 Wins!'", function () {
            expect(page()).not.toContain("P2 Wins!")
            submitForm()
            expect(page()).toContain("P2 Wins!")
        })
    })

    it("sends the user input to the game module", function () {
        let playRoundSpy = jasmine.createSpy()

        render({playRound: playRoundSpy})

        //input "rock"
        let input = document.querySelector("[name='p1Throw']")
        input.value = "rock"
        ReactTestUtils.Simulate.change(input)
        //input "scissors"

        //submit the form
        submitForm()

        //verify game module received input
        expect(playRoundSpy).toHaveBeenCalledWith("rock", "scissors", jasmine.any(Object))
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








