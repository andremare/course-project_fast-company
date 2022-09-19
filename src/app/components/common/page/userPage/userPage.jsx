import React, { useEffect, useState } from "react";
import api from "../../../../api";
import PropTypes from "prop-types";
import UserCard from "../../../ui/userCard";
import QualitiesCard from "../../../ui/qualitiesCard";
import MeetingsCard from "../../../ui/meetingsCard";
import CommentsCard from "../../../ui/commentsCard";

const UserPage = ({ id }) => {
    const [userById, setUserById] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUserById(data));
    }, []);
    if (userById) {
        return <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={userById} />
                    <QualitiesCard qualities={userById.qualities} />
                    <MeetingsCard meetings={userById.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <CommentsCard/>
                </div>
            </div>
        </div>;
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
