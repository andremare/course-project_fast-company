import React, {useState} from "react";
import api from "./api";
import "bootstrap/dist/css/bootstrap.css"
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }

    const handleToggleBookmark = (userId) => {
        const userIndex = users.findIndex(u => u._id === userId)
        const newUsers = [...users]
        newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark
        setUsers(newUsers)
    }

    return (
        <>
            {SearchStatus(users.length)}
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился,раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>

                </tr>
                </thead>
                <tbody>
                    {Users(users, handleToggleBookmark, handleDelete)}
                </tbody>
            </table>
        </>
    )
}

export default App