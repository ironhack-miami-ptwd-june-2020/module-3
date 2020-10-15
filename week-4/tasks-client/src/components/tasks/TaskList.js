import React, { Component } from "react";
import axios from "axios";
import Loading from "../Loading";

class TaskList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: null,
        };
    }

    componentDidMount() {
        axios
            .get(`${process.env.REACT_APP_API_DOMAIN}/task/all-tasks`, {
                withCredentials: true,
            })
            .then((tasksFromApi) => {
                this.setState({ tasks: tasksFromApi.data });
            })
            .catch((err) => console.log({ err }));
    }

    displayTasks() {
        return this.state.tasks.map((task, i) => {
            return (
                <div className="task-box center-content" key={i}>
                    <div className="space-between">
                        <h4>{task.title}</h4>
                        <h5>{task.author}</h5>
                    </div>

                    <div className="left-align">
                        <p>{task.description}</p>
                    </div>

                    <div className="space-between">
                        <h6>
                            {task.isCompleted
                                ? "Task Complete"
                                : "Task Not Complete"}
                        </h6>
                        <h6>Complete By: {task.completionDate}</h6>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="class-container general-padding">
                {this.state.tasks ? this.displayTasks() : <Loading />}
            </div>
        );
    }
}

export default TaskList;
