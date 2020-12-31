import React from "react";
import PlayerCard from "../PlayerCard/PlayerCard.js";
import "./TeamDiv.css";

class TeamDiv extends React.Component {
    constructor() {
        super();
        this.secondsToTime = this.secondsToTime.bind(this);
        this.findPoints = this.findPoints.bind(this);
        this.separateTeams = this.separateTeams.bind(this);
        this.generateCards = this.generateCards.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    state = {
        error: null,
        isLoaded: false,
        active: false,
        time: 0,
        team1: {
            players: [],
            name: 'ORDER'
        },
        team2: {
            players: [],
            name: 'CHAOS'
        },
        events: []
    }
    // https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
    secondsToTime(e){
        var h = Math.floor(e / 3600).toString().padStart(2,'0'),
            m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
            s = Math.floor(e % 60).toString().padStart(2,'0');
        
        return h + ':' + m + ':' + s;
    }

    findPoints(s) {
        var points = 0;
        var player = s.summonerName;
        points += s.scores.kills * 5 // 5 point for kills
        points -= s.scores.deaths * 3 // -3 for deaths
        points += s.scores.assists * 2 // 2 for assists
        points += Math.floor(s.scores.creepScore/50)*3
        points += Math.floor(s.scores.wardScore/3)
        var i, j, k;
        for (i = 0; i < this.state.events.length; i++) {
            if (this.state.events[i].EventName === "FirstBlood") {
                if (this.state.events[i].Recipient === player) {
                    points += 5; // 5 for first blood
                }
            }
            if (this.state.events[i].EventName === "HeraldKill") {
                if (this.state.events[i].KillerName === player) {
                    points += 10; // 5 for epic monster
                }
                for (j = 0; j < this.state.events[i].Assisters.length; j++) {
                    if (this.state.events[i].Assisters[j] === player) {
                        points += 2; // 2 for epic monster assist
                    }
                }
            }
            if (this.state.events[i].EventName === "DragonKill" ) {
                if (this.state.events[i].KillerName === player) {
                    points += 5; // 5 for epic monster
                }
                for (j = 0; j < this.state.events[i].Assisters.length; j++) {
                    if (this.state.events[i].Assisters[j] === player) {
                        points += 2; // 2 for epic monster assist
                    }
                }
                if (this.state.events[i].DragonType === "Elder") {
                    points += 5;
                    for (k = i; k > 0; k--) {
                        if (this.state.events[k].EventName === "DragonKill") {
                            if (this.state.events[k].KillerName === player) {
                                points += 10;
                            }
                            break;
                        }
                    }
                }
                if (this.state.events[i].Stolen === "True") {
                    points += 5; // (+5) for stealing
                }
            }
            if (this.state.events[i].EventName === "FirstBrick") {
                if (this.state.events[i].KillerName === player) {
                    points += 3; // 5 for first turret
                }
            }
            if (this.state.events[i].EventName === "TurretKilled" || this.state.events[i].EventName === "InhibKilled") {
                if (this.state.events[i].KillerName === player) {
                    points += 5 // 5 for turret 
                }
                for (j = 0; j < this.state.events[i].Assisters.length; j++) {
                    if (this.state.events[i].Assisters[j] === player) {
                        points += 2; // 2 for turret assist
                    }
                }
            }
            if (this.state.events[i].EventName === "Multikill") {
                if (this.state.events[i].KillerName === player) {
                    if (this.state.events[i].KillStreak === 5) {
                        points += 50 // penta kill
                        points -= 10
                    }
                    if (this.state.events[i].KillStreak === 4) {
                        points += 10 // 10 for quadra kill
                        points -= 6
                    }
                    if (this.state.events[i].KillStreak === 3) {
                        points += 6 // 6 for triple kill
                        points -= 2
                    }
                    if (this.state.events[i].KillStreak === 2) {
                        points += 2 // 2 for double kill
                    }
                }
            }
        }
        return points;
    }

    separateTeams(data) {
        var teamNames = [];
        var name, i;
        var team1 = [];
        var team2 = [];
        for (i = 0; i < data.length; i++) {
            name = data[i].team;
            if (teamNames.includes(name)) { continue; }
            else { teamNames.push(name) }
        }
        for (i = 0; i < data.length; i++) {
            if (data[i].team === teamNames[0]) {
                team1.push(data[i]);
            }
            else {
                team2.push(data[i]);
            }
        }
        return [teamNames, team1, team2];
    }

    generateCards(players) {
        let t = (
            <div>
                {players.map((p, index) => {
                    return <PlayerCard
                                player={p.summonerName}
                                champion={p.championName}
                                role={p.position.charAt(0).toUpperCase() + p.position.toLowerCase().slice(1)}
                                kda={p.scores.kills + '/' + p.scores.deaths + '/' + p.scores.assists}
                                cs={p.scores.creepScore}
                                ward={Math.floor(p.scores.wardScore)}
                                points={this.findPoints(p)} 
                            />
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
                    var names, team1, team2;
                    if (typeof result.allPlayers != "undefined") {
                        var temp = this.separateTeams(result.allPlayers);
                        names = temp[0];
                        team1 = temp[1];
                        team2 = temp[2];
    
                        this.setState({
                            isLoaded: true,
                            active: true,
                            time: this.secondsToTime(result.gameData.gameTime),
                            team1: {
                                players: team1,
                                name: names[0]
                            },
                            team2: {
                                players: team2,
                                name: names[1]
                            },
                            events: result.events.Events
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        active: false,
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
                <div className="error">
                    <p>No active game</p>
                </div>
            )
        }
        else if (!isLoaded) {
            return (
                <div className="loading">Loading...</div>
            )
        }
        else {
            var team1 = this.generateCards(this.state.team1.players)
            var team2 = this.generateCards(this.state.team2.players)
            return (
                <div>
                    <h1 className="time">Game time: {this.state.time}</h1>
                    <div className="row">
                        <div className="col">
                            <h1>{this.state.team1.name}</h1>
                        </div>
                        <div className="col">
                            <h1>{this.state.team2.name}</h1>
                        </div>
                    </div>
                    <div className="teams">
                        <div className="row">
                            <div className="team1">
                                {team1}
                            </div>
                            <div className="team2">
                                {team2}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default TeamDiv;