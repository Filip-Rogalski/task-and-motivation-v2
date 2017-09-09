import React, { Component } from 'react';
import TasksManager from './TasksManager.jsx';
import PersonalMotivation from './PersonalMotivation.jsx';

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            logged: null
        };
    }
    
    componentWillMount = () => {
        this.setState({
            logged: localStorage.logged
        });
    }
    
    render(){
        if (parseInt(this.state.logged, 10) == -1) {
            return <TasksManager />;
        } else if (parseInt(this.state.logged, 10) > -1) {
            return <PersonalMotivation />;
        } else {
            return <h2 className="logged-out-warn">You must be logged to see this content</h2>    
        }
    }
}

export default Tasks;