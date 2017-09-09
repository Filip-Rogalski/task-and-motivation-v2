import React, { Component } from 'react';
import MotivationBoardAdmin from './MotivationBoardAdmin.jsx';
import MotivationBoard from './MotivationBoard.jsx';

class Board extends Component {
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
            return <MotivationBoardAdmin />;
        } else if (parseInt(this.state.logged, 10) > -1) {
            return <MotivationBoard />;
        } else {
            return <h2 className="logged-out-warn">You must be logged to see this content</h2>
        }
    }
}

export default Board;