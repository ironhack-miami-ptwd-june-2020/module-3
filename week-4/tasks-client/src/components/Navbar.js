import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="space-between">
            <div>
                <Link to="/">Home</Link>
                <Link to="/task-list">Tasks</Link>
            </div>
            <div></div>
        </nav>
    );
}

export default Navbar;
