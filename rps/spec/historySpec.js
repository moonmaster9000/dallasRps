const {Requests, Round}  = require("../src/rps")

describe("history", function () {
    describe("when no rounds have been played", function () {
        it('tell the UI that no rounds have been played', function () {
            let ui = jasmine.createSpyObj("ui", ["noRounds"])

            new Requests().getHistory(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        });
    })

    describe("when rounds have been played", function () {
        fit('getHistory sends the rounds to the UI', function () {
            let requests = new Requests()
            let playRoundUI = {invalid(){}}
            let roundRepo = {
                isEmpty(){},
                getAll(){}
            }

            let getHistoryUI = jasmine.createSpyObj("getHistoryUI", ["rounds"])

            requests.playRound("rock", "sailboat", playRoundUI, roundRepo)
            requests.getHistory(getHistoryUI, roundRepo)

            expect(getHistoryUI.rounds).toHaveBeenCalledWith(
                [
                    new Round("rock", "sailboat", "invalid")
                ]
            )
        });
    })
})


















