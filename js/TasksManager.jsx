import React, { Component } from 'react';
import AddNewTaskForm from './AddNewTaskForm.jsx';

class TasksManager extends Component {

    constructor(){
        super();
        this.state = {
            tasks: [],
            newTaskName: '',
            newTaskValue: 0,
            newTaskPeriodical: false
        };
    }
    
    componentDidMount = () => {
        fetch('http://localhost:3000/tasks').then(resp => {
            return resp.json();
        }).then(data => {
             this.setState({
                 tasks: data
             });
        });
    }
    
    handleNewTaskName = (e) => {
        this.setState({newTaskName: e.target.value});
    }
    
    handleNewTaskValue = (e) => {
        this.setState({newTaskValue: e.target.value});
    }
    
    handleNewTaskPeriodical = (e) => {
        this.setState({newTaskPeriodical: e.target.value});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
     
         let newTask = {
            name: this.state.newTaskName,
            periodic: this.state.newTaskPeriodical,
            score: this.state.newTaskValue
        }

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( newTask )
              });
        
        setTimeout(()=>{
            fetch('http://localhost:3000/tasks').then(resp => {
            return resp.json();
        }).then(data => {
             this.setState({
                 tasks: data
             });
        });
        }, 10)
    }
    
    removeTask = (e) => {
        let taskid = e.target.parentElement.dataset.taskid;
        let fullTasksIndexArray = [];
        this.state.tasks.forEach(item => {
            fullTasksIndexArray.push(item.id);
        })
        let updatedFullTasksIndexArray = fullTasksIndexArray.filter(item => {
            return parseInt(item, 10) !== parseInt(taskid, 10);
        })
        
        fetch('http://localhost:3000/tasks/' + taskid, {
            method: 'DELETE'
        });
        setTimeout(()=>{
            fetch('http://localhost:3000/tasks').then(resp => {
            return resp.json();
        }).then(data => {
             this.setState({
                 tasks: data
             });
        });
        }, 10)
        
    }
    
    render(){
        return (
            <div>
            <div className="task-manager">
            <h4>Tasks Manager</h4>
            <div className="existing-tasks">
            <ul>
                {this.state.tasks.map(item => (
                    <li key={item.id} data-taskid={item.id}><span >{item.name}</span> | {item.periodic ? <span className="periodical-info">Periodical</span> : <span className="periodical-info">One-timer</span>} |
                    <span className="value"> {item.score}</span> | <button onClick={this.removeTask} id="remove-task-admin">Remove task</button></li>
                ))}
            </ul>
            </div>
        </div>
            <AddNewTaskForm handleNewTaskName={this.handleNewTaskName} handleNewTaskValue={this.handleNewTaskValue} handleNewTaskPeriodical={this.handleNewTaskPeriodical} handleSubmit={this.handleSubmit}/>
        </div>);
    }
}
 
export default TasksManager;
    