import React, { Component } from "react";
import axios from "axios";

class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            isComplete: false,
            completionDate: "",
        };
    }

    handleChange(event) {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }

    handleCheckChange(event) {
        const { checked, name } = event.target;

        this.setState({ [name]: checked });
    }

    submitUpdate = () => {
        axios
            .post(
                `${process.env.REACT_APP_API_DOMAIN}/task/create`,
                this.state,
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                // return <Redirect to="/task-list" />;
                this.props.history.push("/task-list");
            })
            .catch((err) => console.log({ err }));
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <label>
                    Complete:
                    <input
                        type="checkbox"
                        name="isComplete"
                        onChange={(event) => this.handleCheckChange(event)}
                        checked={this.state.isComplete}
                    />
                </label>
                <br />
                <input
                    type="date"
                    name="completionDate"
                    value={this.state.completionDate}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />

                <button onClick={this.submitUpdate}>Create</button>
            </div>
        );
    }
}

export default CreateTask;
