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
            .login(this.state.email, this.state.password)
            .then((response) => {
                console.log({ response, props: this.props });
                if (response.message) {
                    this.setState({ message: response.message });
                } else {
                    this.props.getCurrentUser();
                    this.props.history.push("/");
                }
            })
            .catch((err) => {
                console.log({ err });
                this.setState({ message: err.response.data.message });
            });
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
                <button onClick={this.handleSubmit}>Log In</button>
                <br />
                <br />
                {this.state.message && <h3>{this.state.message}</h3>}
            </div>
        );
    }
}

export default Login;
