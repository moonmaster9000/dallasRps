const React = require("react")
const ReactDOM = require("react-dom")
const {Round} = require("rps")
const HistoryDisplay = require("../src/components/HistoryDisplay")

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








