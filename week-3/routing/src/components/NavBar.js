import React from "react";
import { Link } from "react-router-dom";

const navbar = (props) => {
    return (
        <nav className="nav-style">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/projects" style={{ textDecoration: "none" }}>
                        Projects
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default navbar;
