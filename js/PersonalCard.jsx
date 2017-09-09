import React, { Component } from 'react';
import filterTasks from './filterTasks_1';
import getCompletionArray from './getCompletionArray';

class PersonalCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '', 
            name: '', 
            currentTasks: [], 
            prevTasks: [], 
            score: 0, 
            prevTasksToShow: [], 
            currentTasksToShow: [], 
            tasksToAdd: [], 
            addTaskVisible: false
        }
    }
    
    componentDidMount = () => {
        fetch('http://localhost:3000/persons/' + this.props.person.id).then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                id: this.props.person.id,
                name: data.name,
                currentTasks: data.currentTasks,
                prevTasks: data.prevTasks,
                score: data.score
            });
        });
        setTimeout(() => {
            this.setState({
                currentTasksToShow: filterTasks(this.props.tasks, this.state.currentTasks),
                prevTasksToShow: filterTasks(this.props.tasks, this.state.prevTasks),
                tasksToAdd: getCompletionArray(this.props.tasks, this.state.currentTasks)
            });
        }, 0);
    }
    
    componentDidUpdate = () => {
        let newCurrent = filterTasks(this.props.tasks, this.state.currentTasks);
        let newPrev = filterTasks(this.props.tasks, this.state.prevTasks);
        let newToAdd = getCompletionArray(this.props.tasks, this.state.currentTasks);
    
        setTimeout(() => {
            this.setState({
                currentTasksToShow: newCurrent,
                prevTasksToShow: newPrev,
                tasksToAdd: newToAdd
            });
        }, 0);
    }
    
    addTask = (e) => {
        let taskid = parseInt(e.target.parentElement.dataset.taskid, 10),
            curTasks = this.state.currentTasks;
        if (curTasks.indexOf(taskid) == -1) {
            curTasks.push(taskid);
            let updatedCurTasks = curTasks;
            updatedCurTasks.sort((a,b) => {
                return a - b;
            });
            this.setState({ currentTasks: updatedCurTasks });
            let modification = {
                currentTasks: updatedCurTasks
            };
            fetch('http://localhost:3000/persons/' + this.state.id, {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( modification )
                      });
        } else {
            console.warn('task already in current task list');
        }
    }
 
    showHideTasks = () => {
        this.setState(prevState => ({
            addTaskVisible: Boolean((Number(prevState.addTaskVisible) + Number(true)) % 2)
        }));
    }
    
    render(){
        return(
            <div className="personal-card">
                <div className="label"><h3 className="name">{this.state.name} </h3><div className="total">{this.state.score}</div></div>
                 <div className="current-tasks">
                  <h4>Current tasks:</h4>
                   <ul>
                        {this.state.currentTasksToShow.map((task, index) => (
                           <li key={index}><span>{task.name}</span> | <span className="value">{task.score}</span>{task.periodic ? <div className="periodical-info">Periodical</div> : <div className="periodical-info">One-timer</div>} </li>
                        ))}
                        </ul>
                </div>                 
                <div className="previous-tasks">
                <h4>Previous tasks:</h4>
                    <ul>
                    {this.state.prevTasksToShow.map(task => (
                        <li key={task.id}><span>{task.name}</span> | <div className="value">{task.score}</div></li>
                    ))}
                </ul>            
                </div>
            {this.props.admin === true && 
            <div className="add-task">
               <h4>Add task</h4>
                <ul>
                    {this.state.tasksToAdd.map(task => (
                        <li key={task.id} data-taskid={task.id} className="add-button" onClick={this.addTask}><span>+ {task.name}</span> | <span className="value">{task.score}</span></li>
                    ))}
                </ul>
            </div>}
        </div>
                
                
            
        );
    }
}


export default PersonalCard;