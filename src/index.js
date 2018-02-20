import React from 'react';
import ReactDOM from 'react-dom';
import IssueNameComponent from './component/IssueNameComponent.js';
import IssueForm from './component/IssueForm.js';
import $ from 'jquery';
import './index.css';


class App extends React.Component {

    constructor(props) {
        console.log("-------constructor-----------");
        super(props);
        this.state = { todos: [] }
    }

    componentDidMount() {
        console.log("----------componentDidMount-------")
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            success: (data) => {
                this.setState({
                    todos: data
                })
            }
        })
    }

    render() {
        console.log("-------render-----------");
        const { todos } = this.state;
        return (
            <div>
                <h1>AJAX-Demo</h1>
                <hr />
                <ul>
                    {
                        todos.map(
                            (todo) => {
                                return <li>{todo.title}</li>
                            }
                        )
                    }

                </ul>
            </div>
        );
    }
}



class LifeCycleDemoComponent extends React.Component {

    constructor() {
        super();
        console.log("------constructor called---------");
    }

    componentWillMount() {
        console.log("------componentWillMount------------");
    }

    componentDidMount() {
        console.log("--------componentDidMount----------");
    }

    render() {
        console.log("------render----------");
        return (
            <div>
                <h1>Demo of LifeCycle Methods</h1>
            </div>
        );
    }
}


class IssueListComponent extends React.Component {

    constructor() {
        super();
        this.changeStatus = this.changeStatus.bind(this);// insided the render() method in this refernce the given method is not available so we have to bind the chageStatus method to this
        this.updateIssue = this.updateIssue.bind(this);
        this.addIssue = this.addIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
        this.editIssue = this.editIssue.bind(this);
        this.state = {
            issues: [{ name: "item1", completed: false },
            { name: "item2", completed: false },
            { name: "item3", completed: false }],
            currentIssue: ''
        }
    }

    editIssue(index, newValue) {
        console.log(index, newValue);
        let issues = this.state.issues;
        let currentIssue = issues[index];
        currentIssue['name'] = newValue;
        this.setState({
            issues
        })
    }

    deleteIssue(indexToBeDeleted) {
        console.log(indexToBeDeleted + "----item to be deleted---------");
        let issues = this.state.issues;
        issues.splice(indexToBeDeleted, 1);
        this.setState({
            issues: issues
        });
    }

    updateIssue(newValue) {
        this.setState({
            currentIssue: newValue.target.value
        })
    }

    addIssue(event) {
        event.preventDefault();
        let issues = this.state.issues;
        let currentIssue = this.state.currentIssue;
        issues.push({
            name: currentIssue,
            completed: false
        })
        this.setState({
            issues: issues,
            currentIssue: ''
        })
    }


    changeStatus(index) {
        var issues = this.state.issues;
        var issue = issues[index];
        issue.completed = !issue.completed;
        this.setState({
            issues: issues
        });
        console.log(this.state.issues[index]);
    }

    render() {
        return (
            <div>
                <h1>Issue Tracker App</h1>
                <hr />
                <IssueForm
                    currentIssue={this.state.currentIssue}
                    updateIssue={this.updateIssue}
                    addIssue={this.addIssue} />
                <ul>
                    {this.state.issues.map((issue, index) => {
                        return <IssueNameComponent
                            key={issue.name}
                            issue={issue}
                            editIssue={this.editIssue}
                            deleteIssue={this.deleteIssue}
                            clickHandler={this.changeStatus}
                            index={index} />;
                    })}
                </ul>
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('root')); 