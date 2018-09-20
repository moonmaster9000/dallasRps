function Requests() {
    this.playRound = function (p1Throw, p2Throw, ui) {
        new PlayRoundRequest(p1Throw, p2Throw, ui).process()
    }

    this.getHistory = function(ui, roundRepo){
        if (roundRepo.isEmpty())
            ui.noRounds()
        else
            ui.rounds(roundRepo.getAll())
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

function Round(p1Throw, p2Throw, result){
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}

module.exports = {
    Requests,
    Round,
}
