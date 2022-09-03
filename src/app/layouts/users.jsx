import React, { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../components/groupList";
import api from "../api";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/userTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import SearchInput from "../components/searchInput";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;
    const [users, setUsers] = useState();
    const [findText, setFindText] = useState();
    const params = useParams();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setFindText("");
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearchInput = (e) => {
        setFindText(e.target.value);
        clearFilter();
    };
    const clearFilter = () => {
        setSelectedProf();
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession.name === selectedProf.name)
            : users;
        const countFilteredUsers = filteredUsers.length;
        const foundUsers = users.filter((user) => findText ? user.name.toLowerCase().includes(findText.toLowerCase()) : false);
        const countFoundUsers = foundUsers.length;
        const sortedUsers = _.orderBy(
            findText ? foundUsers : filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        if (userCrop.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        const { userId } = params;
        return userId
            ? <UserPage id={userId}/>
            : (
                <div className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                            Очистить
                            </button>
                        </div>
                    )}

                    <div className="d-flex flex-column">
                        <SearchStatus length={findText ? countFoundUsers : countFilteredUsers} />
                        <SearchInput value={findText} onChange={handleSearchInput} />
                        {(countFoundUsers || countFilteredUsers) > 0 && (
                            <UserTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookmark={handleToggleBookmark}
                            />
                        )}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={findText ? countFoundUsers : countFilteredUsers}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            );
    }
    return "loading...";
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
