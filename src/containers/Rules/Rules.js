import React from "react";
import "./Rules.css"

class Rules extends React.Component {
    render() {
        return (
            <div>
                <h1>Rules</h1>
                <div className="rules">
                    <p>(+5) for a kill</p>
                    <p>(-3) for deaths</p>
                    <p>(+2) for assists</p>
                    <p>(+5) additional for first blood</p>
                    <p>(+5) for every epic monster</p>
                    <p>(+2) for every epic monster assist</p>
                    <p>(+5) for stealing epic monsters</p>
                    <p>(+1) for 3 vision score</p>
                    <p>(+5) For first turret</p>
                    <p>(+5) Per structure</p>
                    <p>(+2) For structure assist</p>
                    <p>(+50) for Pentakill</p>
                    <p>(+2) for Double kill</p>
                    <p>(+6) for Triple kill</p>
                    <p>(+10) for Quadra kill</p>
                </div>
            </div>
  
        );
    }
}

export default Rules;