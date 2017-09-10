import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {userName: '', password: ''};
    }
         
    handleUserName = (e) => {
        this.setState({userName: e.target.value});
    }
    
    handlePassword = (e) => {
        this.setState({password: e.target.value});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            name: this.state.userName,
            password: this.state.password
        };
        fetch('http://localhost:3000/persons?name=' + user.name + '&password=' + user.password).then(resp => {
            return resp.json();
        }).then(data => {
            if (data.length == 1) {
                this.props.handleLogin(data[0].id);
            } else {
                console.log('błąd logowania!');
            }
        });
    }

    render(){
        return (
            <div className="row login-form"><div className="label">Login Form</div>
               <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input type="text" id="userName" value={this.state.userName} onChange={this.handleUserName} placeholder="username" autoComplete="off" />
                    <input type="password" id="password" value={this.state.password} onChange={this.handlePassword} placeholder="password"  autoComplete="off"  />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}

export default LoginForm;