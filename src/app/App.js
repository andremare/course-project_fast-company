import React, { useState } from "react";
import api from "./api";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleToggleBookmark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    return (
        <div>
            <Users
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
                users={users}
            />
        </div>
    );
};

export default App;
