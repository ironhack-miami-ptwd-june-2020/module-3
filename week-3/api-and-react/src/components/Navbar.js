import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <div>
                <Link to="/">Home</Link>
                <Link to="poke-list">Poke-List</Link>
            </div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Navbar;
