const React = require("react")
const ReactDOM = require("react-dom")
const {Round} = require("rps")

class HistoryDisplay extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    componentDidMount(){
        this.props.requests.getHistory(this)
    }

    noRounds(){
        this.setState({message: <NoRoundsDisplay/>})
    }

    rounds(rs){
        this.setState({message: <RoundsDisplay rounds={rs}/>})
    }

    render(){
        return <div>
            {this.state.message}
        </div>
    }
}

class NoRoundsDisplay extends React.Component {
    render(){
        return <h1>NO ROUNDS</h1>
    }
}

class RoundsDisplay extends React.Component {
    render(){
        return <table>
            <thead>
            <tr>
                <td>P1 Throw</td>
                <td>P2 Throw</td>
                <td>Result</td>
            </tr>
            </thead>

            <tbody>
            {this.props.rounds.map((r,i) => <tr key={i}>
                <td>{r.p1Throw}</td>
                <td>{r.p2Throw}</td>
                <td>{r.result}</td>
            </tr>)}
            </tbody>
        </table>
    }
}

describe("Displaying History", function () {
    describe("when the game module says there are no rounds", function () {
        beforeEach(function () {
            let requests = {
                getHistory(ui){ ui.noRounds() }
            }

            renderHistory(requests)
        })

        it("displays 'NO ROUNDS'", function () {
            expect(page()).toContain("NO ROUNDS")
        })
    })

    describe("when the game module says there are rounds", function () {
        beforeEach(function () {
            let requests = {
                getHistory(ui){ ui.rounds([new Round("foo", "baz", "bar")]) }
            }

            renderHistory(requests)
        })

        it("displays the rounds data", function () {
            expect(page()).toContain("foo")
            expect(page()).toContain("bar")
            expect(page()).toContain("baz")
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

    function renderHistory(requests) {
        ReactDOM.render(<HistoryDisplay requests={requests}/>, domFixture)
    }
})








