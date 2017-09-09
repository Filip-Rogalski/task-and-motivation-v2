import React, { Component } from 'react';

class LoginInfo extends Component {
    render(){
        return (
            <div className="login-info"><div className="info">You're logged</div>
               <button onClick={this.props.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default LoginInfo;