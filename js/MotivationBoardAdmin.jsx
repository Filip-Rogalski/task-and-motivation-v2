import React, { Component } from 'react';
import PersonalCard from './PersonalCard.jsx';

class MotivationBoardAdmin extends Component {
    constructor(){
        super();
        this.state = {persons: [], tasks: []};
    }
    
    componentDidMount = () => {
        fetch('http://localhost:3000/db').then(resp => {
            return resp.json();
        }).then(data => {
             this.setState({
                 persons: data.persons,
                 tasks: data.tasks
             });
        });
    }
    
    componentWillUnmount = () => {
        this.setState({
            persons: [],
            tasks: []
        });
    }
    
    render(){
        return (
        <div className="motivation-board">
            {this.state.persons.filter((el, index) => { return index > 0}).map((person, index) => (
                <PersonalCard tasks={this.state.tasks} admin={true} key={person.id} person={person} />     
            ))}
        </div>);
    }
}

export default MotivationBoardAdmin;