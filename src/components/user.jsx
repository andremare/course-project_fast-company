import React from "react";
import Qualities from "./qualitie";
import BookMark from "./bookmark";

const User = ({_id, name, qualities, profession, completedMeetings, rate, bookmark}, handleToggleBookmark, handleDelete) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>{Qualities(qualities)}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td className={BookMark(bookmark)}
                onClick={() => handleToggleBookmark(_id)}
            >
            </td>

            <td>
                <button className="btn btn-danger"
                        onClick={() => handleDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

export default User