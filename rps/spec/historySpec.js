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
        it('getHistory sends the rounds to the UI', function () {
            let requests = new Requests()
            let playRoundUI = {invalid(){}}
            let roundRepo = {
                isEmpty(){},
                getAll(){},
                save(){}
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

function FakeRoundRepo(){
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(r){
        rounds.push(r)
    }

    this.getAll = function(){
        return rounds
    }
}

fdescribe("round repo contract", function () {
    let repo

    beforeEach(function () {
        repo = new FakeRoundRepo()
    })

    describe("when no rounds have been saved", function () {
        it("is empty", function () {
            expect(repo.isEmpty()).toEqual(true)
        })
    })

    describe("when rounds have been saved", function () {
        let round

        beforeEach(function () {
            round = new Round("foo", "bar", "baz");
            repo.save(round)
        })

        it('is not empty', function () {
            expect(repo.isEmpty()).toEqual(false)
        })

        it('returns rounds that have been saved', function () {
            expect(repo.getAll()).toEqual([round])
        })
    })
})


















