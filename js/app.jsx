import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';
import Board from './Board.jsx';
import Template from './Template.jsx';
import Tasks from './Tasks.jsx';
import Entrance from './Entrance.jsx';
import "../sass/sass.scss";


class App extends Component {
    render(){
        return (
        <Router history={hashHistory}>
            <Route path='/' component={Template} >
                <IndexRoute component={Entrance} />
                <Route path='/board' component={Board}  />
                <Route path='/tasks' component={Tasks} />
            </Route>
        </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));