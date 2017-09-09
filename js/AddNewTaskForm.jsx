import React, { Component } from 'react';

class AddNewTaskForm extends Component {
    
    render(){
        return(
            <div className="new-task-form"><div className="label">Add new task</div>
                <form onSubmit={this.props.handleSubmit}>
                    <input type="text" id="name" value={this.props.newTaskName} onChange={this.props.handleNewTaskName} placeholder="Task name" />
                    <input type="number" id="value" value={this.props.newTaskValue} onChange={this.props.handleNewTaskValue} placeholder="0" />
                    <div className="checkbox-label">Periodical</div>
                    <input type="checkbox" id="periodical" value={this.props.newTaskPeriodical} onChange={this.props.handleNewTaskPeriodical} />
                    <input type="submit" value="Confirm" />
                </form>
            </div>
        );
    }
}

export default AddNewTaskForm;