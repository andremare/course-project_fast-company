import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api";
import MultiSelectField from "../../form/multiSelectField";
import RadioField from "../../form/radioField";
import SelectField from "../../form/selectField";
import TextField from "../../form/textField";
// import PropTypes from "prop-types";

const UserEditPage = () => {
    const { userId } = useParams();
    console.log("userId", userId);
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [userById, setUserById] = useState();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: ""
    });
    useEffect(() => {
        api.users.getById(userId).then((data) => setUserById(data));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const userQualitiesList = userById
        ? userById.qualities.map((q) => ({
            value: q._id,
            label: q.name
        }))
        : [];
    console.log("userQualitiesList", userQualitiesList);

    console.log("professions", professions);
    console.log("qualities", qualities);

    console.log("data", data);

    console.log("userById", userById);

    // const userPath = `/users/${userId}`;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("e", e);
        api.users.update(userId, data);
        console.log("dataSubmit", data);
        // history.replace(`/users/${userId}`);
    };
    const handleChange = (target) => {
        console.log("target", target);
        const data = target.value;
        console.log("target.value", target.value);
        if (target.name === "qualities") {
            const transformQualities = Object.keys(target.value).map((q) => ({
                _id: data[q].value,
                name: data[q].label
            }));
            console.log("transformQualities", transformQualities);
            setData((prevState) => ({ ...prevState, [target.name]: transformQualities }));
        } else if (target.name === "profession") {
            const findProf = professions.filter(p => (p.value === target.value))[0];
            console.log("findProf", findProf);
            const transformProfession = {
                _id: findProf.value,
                name: findProf.label
            };
            console.log("transformProfession", transformProfession);
            setData((prevState) => ({ ...prevState, [target.name]: transformProfession }));
        } else setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    return <>
        {userById && professions && qualities
            ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name || userById.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email || userById.email}
                                    onChange={handleChange}
                                />
                                <SelectField
                                    defaultOption="Choose..."
                                    label="Выберите вашу профессию"
                                    options={professions}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession || userById.profession._id}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex || userById.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities || userQualitiesList}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                {/* <Link to={userPath}> */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                     Обновить
                                </button>
                                {/* </Link> */}
                            </form>
                        </div>
                    </div>
                </div>
            )
            : "Loading..." }
    </>;
};
//
// // UserEditPage.propTypes = {
// //
// // };
//
export default UserEditPage;
