import React, { Component } from "react";
import axios from "axios";
import Loading from "../Loading";
import { Link } from "react-router-dom";

class TaskList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: null,
        };
    }

    componentDidMount() {
        this.getAllTasks();
    }

    getAllTasks() {
        axios
            .get(`${process.env.REACT_APP_API_DOMAIN}/task/all-tasks`, {
                withCredentials: true,
            })
            .then((tasksFromApi) => {
                this.setState({ tasks: tasksFromApi.data });
            })
            .catch((err) => console.log({ err }));
    }

    deleteTask(taskId) {
        axios
            .delete(
                `${process.env.REACT_APP_API_DOMAIN}/task/delete/${taskId}`,
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                console.log("task deleted");
                this.getAllTasks();
            })
            .catch((err) => console.log({ err }));
    }

    displayTasks() {
        return this.state.tasks.map((task, i) => {
            // console.log({ task });
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
                        {task.isComplete ? (
                            <h6>Task Complete</h6>
                        ) : (
                            <h6>Task Not Complete</h6>
                        )}

                        <div>
                            <Link to={`/update/${task._id}`}> Edit </Link>
                            <button onClick={() => this.deleteTask(task._id)}>
                                Delete
                            </button>
                        </div>

                        <h6>Complete By: {task.completionDate}</h6>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="general-padding">
                <h2>All Tasks</h2>
                <hr />
                <Link to="/task/create"> Create Task </Link>
                <br />
                <br />
                <div className="task-container">
                    {this.state.tasks ? this.displayTasks() : <Loading />}
                </div>
            </div>
        );
    }
}

export default TaskList;
