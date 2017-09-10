import React, { Component } from 'react';

class TaskItem extends Component {
    constructor(){
        super();
    }
    
    
    
    render(){
        return(
            <li data-taskid={this.props.taskid} ><span>+ {this.props.name}</span> | <span className="value">{this.props.score}</span>
            {this.props.periodic ?
                <form className="period-form">
                   <div className="periodical-info">Periodical:</div>
                    <select className="period-select" id="period">
                          <option value="weekly">weekly</option>
                          <option value="monthly">monthly</option>
                    </select>
                    <div className="periodical-info">start:</div>
                    <input type="date" id="start-day"/>
                    </form> : <div className="block"><div className="periodical-info">One-timer</div></div> }
            
            <span className="add-button" onClick={this.props.addTask}>Add</span>
            </li>
        );
    }
}

export default TaskItem;