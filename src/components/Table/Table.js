import React from "react";
import "./Table.css";

class Table extends React.Component {
    constructor() {
        super();
        this.generateTable = this.generateTable.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    state = {
        error: null,
        isLoaded: false,
        players: [],
        events: []
    }

    generateTable() {
        let t = (
            <div>
                {this.state.players.map((p, index) => {
                    return
                    <tr>
                        <td>{p.summonerName}</td>
                        <td>{p.championName}</td>
                        <td>{p.scores.kills}</td>
                        <td>{p.scores.deaths}</td>
                        <td>{p.scores.assists}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                })}
            </div>
        );
        return t;
    }


    loadData() {
        fetch("/allgamedata")
            .then(res => res.json())
            .then(
                (result) => {
                // don't ask
                    if (result.allPlayers.length > 0) {    
                        this.setState({
                            isLoaded: true,
                            time: this.secondsToTime(result.gameData.gameTime),
                            players: result.allPlayers,
                            events: result.events.Events
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 1000);
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return (
                <div className="error">No active game</div>
            )
        }
        else if (!isLoaded) {
            return (
                <div className="loading">Loading...</div>
            )
        }
        else {
            return (
                <div>
                    <table>
                        <tr>
                            <th>Summoner</th>
                            <th>Champion</th>
                            <th>Kills</th>
                            <th>Deaths</th>
                            <th>Assists</th>
                            <th>Epic Monsters</th>
                            <th>Stolen</th>
                            <th>First Blood</th>
                            <th>First Turret</th>
                            <th>Structures Destroyed</th>
                            <th id="points">Points</th>
                        </tr>
                        {this.generateTable()}
                    </table>
                </div>
            );
        }
    }
}

export default Table;