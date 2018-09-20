const React    = require("react")
const ReactDOM = require("react-dom")

const {Requests, Round} = require("rps")

const HistoryDisplay = require("./src/components/HistoryDisplay")
const PlayForm       = require("./src/components/PlayForm")

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


let repo = new FakeRoundRepo()

repo.save(new Round("foo", "bar", "invalid"))
repo.save(new Round("rock", "rock", "tie"))

let requests = new Requests(repo)

class App extends React.Component {
    render(){
        return <div>
            <PlayForm requests={requests}/>
            <HistoryDisplay requests={requests}/>
        </div>
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#app")
)