import React from "react";
import { Link } from "react-router-dom"
import "./Navbar.css"
import logo from "../../assets/esticord.png"


class Navbar extends React.Component {
    render() {
        return (
            <div className="nav">
                <div>
                    <ul>
                        <li className="Nav_item">
                            <Link className="Nav_link" to="/">Home</Link>
                        </li>
                        <li className="Nav_item">
                            <Link className="Nav_link" to="/rules">Rules</Link>
                        </li>
                    </ul>
                </div>
                    <a className="navbar-brand">
                        <img className="navbar-brand" src={logo} alt="logo"></img>
                    </a>
            </div>
        )
    };
};

export default Navbar;