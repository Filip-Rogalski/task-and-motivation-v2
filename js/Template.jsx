import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class Template extends Component {
    render(){
        return (
            <div>
               <header>
                <div className="row">
                    <h1 className="main-title">Task Manager and <br /> Motivation Board</h1>
                    <ul className="main-menu">
                        <li><Link to="/board">Motivation Board</Link>
                        </li>
                        <li><Link to="/tasks">Task Manager</Link></li>
                        <li><IndexLink to="/">Login </IndexLink></li>
                    </ul>
                </div>
                </header>
                <div className="row project-wrapper">
                    {this.props.children}
                </div>
                <footer>
                    
                </footer>
            </div>
        );
    }
}

export default Template;