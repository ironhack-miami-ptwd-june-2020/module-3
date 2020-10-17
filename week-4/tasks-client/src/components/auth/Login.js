import React, { Component } from "react";
import AuthService from "../services/AuthService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: null,
        };

        this.service = new AuthService();
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        this.service
            .login(this.state)
            .then((response) => {
                if (response.message) {
                    this.setState({ message: response.message });
                } else {
                    this.props.history.push("/");
                }
            })
            .catch((err) => console.log({ err }));
    };

    render() {
        return (
            <div>
                <div>
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                </div>
                <br />
                <button onClick={this.handleSubmit}>Sign Up</button>
                <br />
                <br />
                {this.state.message && <h3>{this.state.message}</h3>}
            </div>
        );
    }
}

export default Login;
