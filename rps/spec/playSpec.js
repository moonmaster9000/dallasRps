function Requests() {
    this.playRound = function (p1Throw, p2Throw, ui) {
        new PlayRoundRequest(p1Throw, p2Throw, ui).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, ui){
    this.process = function(){
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw))
            ui.invalid()
        else if (tie())
            ui.tie()
        else if (p1Wins())
            ui.p1Wins()
        else
            ui.p2Wins()
    }

    function invalidThrow(aThrow) {
        let validThrows = ["rock", "paper", "scissors"]
        return !validThrows.includes(aThrow);
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return (
            p1Throw === "rock"     && p2Throw === "scissors"  ||
            p1Throw === "scissors" && p2Throw === "paper"     ||
            p1Throw === "paper"    && p2Throw === "rock"
        )
    }
}


describe("playRound", function () {
    let ui

    describe("p1 win scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p1Wins"])
        })

        it('rock v. scissors', function () {
            playRound("rock", "scissors", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it('scissors v. paper', function () {
            playRound("scissors", "paper", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it('paper v. rock', function () {
            playRound("paper", "rock", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })
    })

    describe("p2 win scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p2Wins"])
        })

        it('scissors v. rock', function () {
            playRound("scissors", "rock", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it('paper v. scissors', function () {
            playRound("paper", "scissors", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it('rock v. paper', function () {
            playRound("rock", "paper", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            playRound("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("invalid v. rock", function () {
            playRound(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("rock v. invalid", function () {
            playRound("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it('invalid v. same invalid', function () {
            playRound("sailboat", "sailboat", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })

    function playRound(p1, p2, ui){
        new Requests().playRound(p1, p2, ui)
    }
})