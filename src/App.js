import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import AdminLayout from "layouts/Admin.js";
import {Redirect} from "react-router";

function App() {
    return (<Router>
            <div className="App">
                <div className="outer">
                    <div className="inner">
                        <Switch>
                            <Route exact path='/' component={Login}/>
                            <Route path="/sign-in" component={Login}/>
                            <Route path="/sign-up" component={SignUp}/>
                            <Route path="/home" render={(props) => <AdminLayout {...props} />} />
                            {/*<Redirect from="/" to="/admin/dashboard" />*/}
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
