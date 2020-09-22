import React, { Component } from "react";
import "../App.css";

function Nav(props) {
    // in order to get the props in a functional component, you would need to pass props as the parameter for the component.
    // you can then call props within that that component in order to get the props.

    // to make a function that you can use within a functional component, you would have to create the function first then call it in your html element like so {showUsernavs()}
    function showUserNavs() {
        if (props.name !== "Marcos") {
            // when returning html elements you will want to use () and always return only one html element with as many other elements within that primary element as you need ei: <div> </div>
            return (
                <div>
                    <a href="#">Signup</a>
                    <a href="#">Login</a>
                </div>
            );
        } else {
            return (
                <div>
                    <h6>Hello {props.name}</h6>
                    <a href="#">Logout</a>
                </div>
            );
        }
    }

    return (
        <div className="navStyling">
            <div>
                <a href="#">Home</a>
            </div>
            <div>
                {/* you can call functions and methods within your return by putting them {} between your calls ei: {console.log('blah)} */}
                {console.log({ props })}
                {/* ternary functions are used when you want a conditional within your html element or passing information to component based on some condition */}
                {/* {!props.name ? (
                    <div>
                        <a href="#">Signup</a>
                        <a href="#">Login</a>
                    </div>
                ) : (
                    <div>
                        <h6>Hello {props.name}</h6>
                        <a href="#">Logout</a>
                    </div>
                )} */}
                {/* a better option than writing conditionals in your html element is to call a function to do all the js work for you then return what you would like displayed */}
                {showUserNavs()}
            </div>
        </div>
    );
}

export default Nav;
