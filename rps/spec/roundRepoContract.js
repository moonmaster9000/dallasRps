const {Round} = require("../src/rps")

function roundRepoContract(roundRepoClass){
    describe("round repo contract", function () {
        let repo

        beforeEach(function () {
            repo = new roundRepoClass()
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
}

module.exports = roundRepoContract
