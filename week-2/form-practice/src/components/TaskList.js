import React, { Component } from "react";
import "../App.css";
import AddTask from "./AddTask";

class TaskList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            filteredTasks: [],
            searchTerm: "",
        };
    }

    showTasks() {
        console.log("filtered list", {
            filtered: this.state.filteredTasks,
            searchTerm: this.state.searchTerm,
        });
        return this.state.filteredTasks.map((task, i) => {
            return (
                <li key={i}>
                    <h3>{task.title}</h3>
                    <h4>{task.details}</h4>
                    <h5>Created By: {task.author}</h5>
                </li>
            );
        });
    }

    addTaskToList = (taskToAdd) => {
        const currentTasks = [...this.state.tasks, taskToAdd];
        this.setState({
            tasks: currentTasks,
            filteredTasks: currentTasks,
        });
    };

    handleChange(event) {
        const { name, value } = event.target;

        const filteredList = this.state.tasks.filter((task) =>
            task.title.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({ [name]: value, filteredTasks: filteredList });
    }

    render() {
        return (
            <div>
                <h1>List of Tasks</h1>
                <br />
                <hr />
                <AddTask addTaskToTasksList={this.addTaskToList} />
                <br />
                <hr />
                <input
                    type="text"
                    name="searchTerm"
                    value={this.state.searchTerm}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <hr />
                <ul>{this.showTasks()}</ul>
            </div>
        );
    }
}

export default TaskList;
