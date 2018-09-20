const {Requests, Round}  = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    let requests, roundRepo

    beforeEach(function () {
        roundRepo = new FakeRoundRepo()
        requests    = new Requests(roundRepo)
    })

    describe("when no rounds have been played", function () {
        it('tell the UI that no rounds have been played', function () {
            let ui = jasmine.createSpyObj("ui", ["noRounds"])
            requests.getHistory(ui)
            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    describe("when rounds have been played", function () {
        let playRoundUI, getHistoryUI

        beforeEach(function () {
            playRoundUI = {invalid(){}, tie(){}, p1Wins(){}, p2Wins(){}}
            getHistoryUI = jasmine.createSpyObj("getHistoryUI", ["rounds"])
        })

        describe("when invalid rounds have been played", function () {
            it('getHistory sends the rounds to the UI', function () {
                requests.playRound("rock", "sailboat", playRoundUI)
                requests.getHistory(getHistoryUI)
                expect(getHistoryUI.rounds).toHaveBeenCalledWith([new Round("rock", "sailboat", "invalid")])
            })
        })

        describe("when tie rounds have been played", function () {
            it('getHistory sends the ties to the UI', function () {
                requests.playRound("rock", "rock", playRoundUI)
                requests.getHistory(getHistoryUI)
                expect(getHistoryUI.rounds).toHaveBeenCalledWith([new Round("rock", "rock", "tie")])
            })
        })

        describe("when p1Wins rounds have been played", function () {
            it('getHistory sends the p1Wins to the UI', function () {
                requests.playRound("rock", "scissors", playRoundUI)
                requests.getHistory(getHistoryUI)
                expect(getHistoryUI.rounds).toHaveBeenCalledWith([new Round("rock", "scissors", "p1Wins")])
            })
        })

        describe("when p2Wins rounds have been played", function () {
            it('getHistory sends the p2Wins to the UI', function () {
                requests.playRound("scissors", "rock", playRoundUI)
                requests.getHistory(getHistoryUI)
                expect(getHistoryUI.rounds).toHaveBeenCalledWith([new Round("scissors", "rock", "p2Wins")])
            })
        })
    })
})

















