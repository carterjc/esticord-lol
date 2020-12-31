import React from "react";
import "./PlayerCard.css"

class PlayerCard extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="info">
                    <h1>{this.props.player}</h1>
                    <p>Champion: {this.props.champion}</p>
                    <p>Role: {this.props.role}</p>
                    <p>KDA: {this.props.kda}</p>
                    <p>CS: {this.props.cs}</p>
                    <p>Ward score: {this.props.ward}</p>
                    <h3>Points: {this.props.points}</h3>
                </div>
            </div>
        );
    }
}

export default PlayerCard;