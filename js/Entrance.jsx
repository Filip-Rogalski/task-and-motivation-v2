import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import LoginInfo from './LoginInfo.jsx';
import RegisterForm from './RegisterForm.jsx';
import newDateToString from './newDateToString.js';
import getYrMnDy from './getYrMnDy.js';
import getYearMonthLengths from './getYearMonthLengths.js';

class Entrance extends Component {
    constructor(){
        super();
        this.state = {
            logged: null,
            userTasks: [],
            tasks: []
        };
    }
    
    componentWillMount = () => {
        fetch('http://localhost:3000/tasks').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                tasks: data
            });
        });
        
        this.setState({
            logged: localStorage.logged
        });
    }
    
    handleLogin = (userid) => {
         this.setState({logged: userid}, function(){
               localStorage.logged = userid;
         });
        
        
        let tasksToRefresh = [];
        
        fetch('http://localhost:3000/persons/' + userid).then(resp => {
            return resp.json();
        }).then(data => {
            
            this.setState({
                userTasks: data.currentTasks
            });
            
            let periodicTasks = data.periodicTasks;
            let currentTasks = data.currentTasks;
            
            if (periodicTasks.length > 0) {
                let actualDate = new Date(),
                    actualDay = actualDate.getDate() - 1, // substract 1 for future %-operation usage.
                    actualMonth = actualDate.getMonth(),
                    actualYear = actualDate.getFullYear();
            
            periodicTasks.forEach(element => {
                if (currentTasks.indexOf(element.id) == -1) {
                    
                    let taskId = element.id;
                    let elementPeriod = element.period;
                    let taskStartString = element.start;
                    
                    console.log(element);
                    
                    let [startYear, startMonth, startDay] = getYrMnDy(taskStartString);
                    
                    let startYearMonthLengths = getYearMonthLengths(startYear);
                    
                 
                    if (elementPeriod === "weekly") {
                        
                        let refreshDateDy;
                        let dayPlusSeven = startDay + 7;
                        
                        if (dayPlusSeven > startYearMonthLengths[startMonth]) {
                            refreshDateDy = dayPlusSeven - startYearMonthLengths[startMonth];
                        } else {
                            refreshDateDy = dayPlusSeven;
                        }
                        
                        let refreshDateMn = (startMonth + Number(refreshDateDy < startDay)) % 12,
                            refreshDateYr = startYear + Number(refreshDateMn < startMonth);
                        
                        let date = new Date();
                        date.setFullYear(refreshDateYr, refreshDateMn, refreshDateDy);
                        let now = new Date();
                        if (now > date) {
                            tasksToRefresh.push(element.id);
                        }
                        
                        
                    } else {
                        let refreshDateDy;
                        
                        if (startDay > startYearMonthLengths[(startMonth + 1) % 12]) {
                            refreshDateDy = startYearMonthLengths[(startMonth + 1) % 12]
                        } else {
                            refreshDateDy = startDay;
                        };
                        
                        let refreshDateMn = (startMonth + 1) % 12,
                            refreshDateYr = startYear + Number(refreshDateMn < startMonth);
                        
                        let date = new Date();
                        date.setFullYear(refreshDateYr, refreshDateMn, refreshDateDy);
                        let now = new Date();
                        if (now > date) {
                            tasksToRefresh.push(element.id);
                        }
                        
                    }
                }
            });
            }
            
            return true
            
        }).then(() => {
            let userActiveTasks = this.state.userTasks;
            
            let userUpdatedActiveTasks = userActiveTasks.concat(tasksToRefresh);
            
            userUpdatedActiveTasks.sort((a, b) => {
                return a - b;
            });
            
            let modification = {
                currentTasks: userUpdatedActiveTasks
            };
            
            return fetch('http://localhost:3000/persons/' + this.state.logged, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( modification )
            });
        }).then(() => {
            window.location.href = 'http://localhost:3001/#/tasks';
        }, (err) => {
            console.log(err);
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