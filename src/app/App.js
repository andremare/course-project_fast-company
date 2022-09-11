import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import UsersListPage from "./components/common/page/usersListPage/usersListPage";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" component={UsersListPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
