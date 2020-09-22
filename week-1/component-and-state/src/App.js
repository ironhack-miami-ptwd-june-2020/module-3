import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./Components/Nav";
// unlike express, in React you import what you will use in the component and not require it. (this works more like js file);

//  This is an example for a functional component
// functional components can receive data but do not manipulate the data. They are primarily used to render information on the page or for reusable functions that will be called within your app.

// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.js</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Learn React
//                 </a>
//             </header>
//         </div>
//     );
// }

// This is an example of a Class Component.
// Class components have a constructor and a state which can stor data that will be used and manipulated within the component.
// any function called within the constructor will be called prior to the component rendering the html element that is in the component.
class App extends Component {
    // to get the props (data sent from parent component) from a class component, you would have to call props as the parameter for the constructor and the super methods.
    // in order to use the props within the constructor you can just call props but for the rest of the component you would call this.props.
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            contacts: [],
        };
    }
    render() {
        return (
            <div className="App">
                {/* when calling another Component you will add it as if it was an html element (for that reason you will name your user created components with a Capital letter) */}
                <Nav name={this.state.name} />
                {/* if you wish to pass data to a child component you can do so as a parameter in the component tag  as shown in the Nav tag */}
                {/* to get the information from a variable in your state, you would call the variable with this.state.<variable name> */}
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React with {this.state.name}
                    </a>
                </header>
            </div>
        );
    }
}

// remember to export default the primary function or class name from the component. The name of the component is usually the same name as the file.
export default App;
