import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class UpdateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            isComplete: false,
            completionDate: "",
            taskId: "",
        };
    }

    componentDidMount() {
        axios
            .get(
                `${process.env.REACT_APP_API_DOMAIN}/task/details/${this.props.match.params.taskId}`,
                {
                    withCredentials: true,
                }
            )
            .then((taskDetailsFromApi) => {
                console.log({ taskDetails: taskDetailsFromApi.data });
                this.setState({
                    ...taskDetailsFromApi.data,
                    taskId: taskDetailsFromApi.data._id,
                });
            })
            .catch((err) => console.log({ err }));
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
            .put(
                `${process.env.REACT_APP_API_DOMAIN}/task/update`,
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

                <button onClick={this.submitUpdate}>Update</button>
            </div>
        );
    }
}

export default UpdateTask;
