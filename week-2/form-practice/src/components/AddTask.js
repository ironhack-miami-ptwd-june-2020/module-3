import React, { Component } from "react";
import "../App.css";

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            details: "",
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // const theTask = {
        //     author: this.state.author,
        //     title: this.state.title,
        //     details: this.state.details,
        // };

        this.props.addTaskToTasksList(this.state);

        this.setState({
            title: "",
            author: "",
            details: "",
        });
    };

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <h2>Add A Task</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Author:
                        <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            // onChange={this.handleChange}
                            onChange={(event) => {
                                this.handleChange(event);
                            }}
                        />
                    </label>
                    <label>
                        Title:{" "}
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            // onChange={this.handleChange}
                            onChange={(event) => {
                                this.handleChange(event);
                            }}
                        />
                    </label>
                    <label>
                        Details:
                        <input
                            type="text"
                            name="details"
                            value={this.state.details}
                            // onChange={this.handleChange}
                            onChange={(event) => {
                                this.handleChange(event);
                            }}
                        />
                    </label>

                    <button>Add Task</button>
                </form>
            </div>
        );
    }
}

export default AddTask;
