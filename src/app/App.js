import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./components/users";
import NavBar from "./components/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
