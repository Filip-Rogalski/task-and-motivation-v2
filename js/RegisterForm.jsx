import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor(){
        super();
        this.state = {newUserName: '', newUserPassword: '', newUserPasswordRepeat: '', passwordValidation: false, newUserNameValidation: false};
    }
    
    handleNewUserName = (e) => {
        this.setState({newUserName: e.target.value});
    }
    
    handleNewUserPassword = (e) => {
        this.setState({newUserPassword: e.target.value});
    }
    
    handleNewUserPasswordRepeat = (e) => {
        this.setState({newUserPasswordRepeat: e.target.value});
    }
    
    validationPassword = (a, b) => {
        if ((a !== null) && (a === b)) {
            this.setState({passwordValidation: true}, () => {
                console.log('password ok');
            });
        } else {
            console.log('passwords don\'t match!');
        }
    }
    
    validationNewUserName = (name) => {
        fetch('http://localhost:3000/persons?name=' + name).then(resp => {
            return resp.json();
        }).then(data => {
            if (data.length == 0) {
                this.setState({newUserNameValidation: true}, () => {
                    console.log('username ok');
                });
            } else {
                console.log('username already taken!');
            }
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.validationPassword(this.state.newUserPassword, this.state.newUserPasswordRepeat);
        this.validationNewUserName(this.state.newUserName);
        setTimeout(()=>{
            if (this.state.passwordValidation == true && this.state.newUserNameValidation == true) {
                 let newUser = {
                    name: this.state.newUserName,
                    password: this.state.newUserPassword,
                    score: 0,
                    currentTasks: [],
                    prevTasks: []
                }
                fetch('http://localhost:3000/persons', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( newUser )
                }).then(()=>{
                    console.log('new user registered!');
                });
            }
        }, 100);
        
       
        
        
    }
    
    /* For the moment */
    
    render(){
        return (
            <div className="row register-form"><div className="label">Register Form</div>
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                   <input type="text" id="userName" value={this.state.newUserName} onChange={this.handleNewUserName} placeholder="username" autoComplete="off" />
                    <input type="password" id="password" value={this.state.newUserPassword} onChange={this.handleNewUserPassword} placeholder="password" autoComplete="off" />
                    <input type="password" id="passwordRepeat" value={this.state.newUserPasswordRepeat} onChange={this.handleNewUserPasswordRepeat} placeholder="repeat password" />
                    <input type="submit" value="register" />
                </form>
            </div>
        );
    }
}

export default RegisterForm;