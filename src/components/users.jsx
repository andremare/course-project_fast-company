import React, {useState} from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }

    const renderPhrase = () => {
        return users.map(user => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.qualities.map(quality => (
                    <span className={"m-2 badge bg-" + quality.color}>
                        {quality.name}
                    </span>))}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                    <button className="btn btn-danger"
                            onClick={() => handleDelete(user._id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        ))
    }

    const renderAmountTag = (amount) => {
        const amountString = String(amount).split('')
        const lastLetter = Number(amountString.slice(amountString.length-1, amountString.length))
        if(amount === 0) {
            return <h1 className="btn btn-danger m-2">Сегодня никто с тобой не тусанет</h1>
        } else if((lastLetter === 1 && (amount === 1 || amount > 20))
            || (amount > 4 && amount < 11)
            || (amount > 10 && amount < 15) ) {
            return <h1 className="btn btn-primary m-2">{amount} человек тусанет с тобой сегодня</h1>
        } else {
            return <h1 className="btn btn-primary m-2">{amount} человека тусанет с тобой сегодня</h1>
        }
    }

    return (
    <>
        {renderAmountTag(users.length)}
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился,раз</th>
                <th scope="col">Оценка</th>
            </tr>
            </thead>
            <tbody>
                 {renderPhrase()}
            </tbody>
        </table>
    </>
    )
}

export default Users
