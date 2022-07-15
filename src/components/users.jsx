import React from "react";
import User from "./user";

const Users = (users, handleToggleBookmark, handleDelete) => {
    return users.map(user => User(user, handleToggleBookmark, handleDelete))
}

export default Users