import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./components/Login";
import AdminLayout from "layouts/Admin.js";
import {Redirect} from "react-router";
import NewUser from "./components/NewUser";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "App.css";
import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { color: "#ffffff", opacity: 1 };
    }

    changeColor = color => {
        this.setState({ color });
    };

    render() {
        const current_page = this.props.location.pathname;
        return (
            <Router>
                <div className="App" id="divLogin" style={current_page !== '/' ? {background: this.state.color} : {}}>
                    <Route render={({location}) => (
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                timeout={450}
                                classNames="fade">
                                <Switch location={location}>
                                    <Route exact path='/' component={Login}/>
                                    <Route path="/new-user" component={NewUser}/>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}/>
                    <Switch>
                        {/*    <Route exact path='/' component={Login}/>*/}
                        {/*    <Route path="/new-user" component={NewUser}/>*/}
                        {/*    <Route path="/sign-in" component={Login}/>                            */}
                        <Route path="/home"
                               render={(props) => <AdminLayout {...props} />}
                               onClick={() => {this.changeColor("#ffffff")}}/>
                        {/*    /!*<Redirect from="/" to="/admin/dashboard" />*!/*/}
                    </Switch>
                </div>
            </Router>
        );
    }
}

// ReactDOM.render(<App />, document.getElementById("root"));
export default App;
