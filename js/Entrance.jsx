import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import LoginInfo from './LoginInfo.jsx';
import RegisterForm from './RegisterForm.jsx';

class Entrance extends Component {
    constructor(){
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
    
    handleLogin = (userid) => {
         this.setState({logged: userid}, function(){
               localStorage.logged = userid;
         });
    }
     
     handleLogout = () => {
         this.setState({logged: null});
         localStorage.clear();
     }
    
    render(){
        if(!!this.state.logged) {
            return (<div>
                <LoginInfo handleLogout={this.handleLogout}/>
            </div>);
        } else {
            return (<div className="row">
               <LoginForm handleLogin={this.handleLogin} />
               <RegisterForm />
            </div>);      
        }
    }
}

export default Entrance;