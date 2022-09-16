import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../../api";
import PropTypes from "prop-types";
import QualitiesList from "../../../ui/qualities/qualitiesList";

const UserPage = ({ id }) => {
    const [userById, setUserById] = useState();
    const history = useHistory();
    const handleChange = () => {
        history.push(`/users/${id}/edit`);
    };
    useEffect(() => {
        api.users.getById(id).then((data) => setUserById(data));
    }, []);
    return <>
        {userById
            ? (
                <>
                    <h1>{userById.name}</h1>
                    <h2>{`Профессия: ${userById.profession.name}`}</h2>
                    <h5>{<QualitiesList qualities={userById.qualities} />}</h5>
                    <h4>{`Завершенные встречи: ${userById.completedMeetings}`}</h4>
                    <h5>{`Рейтинг: ${userById.rate}`}</h5>
                    <button onClick={() => { handleChange(); }}>Изменить</button>
                </>
            )
            : "Loading..." }
    </>;
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
