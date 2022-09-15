import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../../api";
import MultiSelectField from "../../form/multiSelectField";
import RadioField from "../../form/radioField";
import SelectField from "../../form/selectField";
import TextField from "../../form/textField";

const UserEditPage = () => {
    const { userId } = useParams();
    console.log("userId", userId);
    const history = useHistory();
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: {},
        sex: "",
        qualities: []
    });
    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
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
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const userQualitiesList = data?.qualities?.length
        ? data.qualities.map((q) => ({
            value: q._id,
            label: q.name,
            color: q.color
        }))
        : [];
    console.log("userQualitiesList", userQualitiesList);
    console.log("professions", professions);
    console.log("qualities", qualities);
    console.log("data", data);
    const handleSubmit = (e) => {
        e.preventDefault();
        api.users.update(userId, data);
        console.log("dataSubmit", data);
        history.push(`/users/${userId}`);
    };
    const handleChange = (target) => {
        console.log("target", target);
        const data = target.value;
        console.log("target.value", target.value);
        if (target.name === "qualities") {
            const transformQualities = Object.keys(target.value).map((q) => ({
                _id: data[q].value,
                name: data[q].label,
                color: data[q].color
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
        {data && professions && qualities
            ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                <SelectField
                                    defaultOption="Choose..."
                                    label="Выберите вашу профессию"
                                    options={professions}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession._id}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                {console.log("qualities1", qualities)}
                                {console.log("data.qualities1", data.qualities)}
                                <MultiSelectField
                                    defaultValue={data.qualities.map((q) => ({
                                        value: q._id,
                                        label: q.name,
                                        color: q.color
                                    }))}
                                    options={qualities}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                     Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )
            : "Loading..." }
    </>;
};

export default UserEditPage;
