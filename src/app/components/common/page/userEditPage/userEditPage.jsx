import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../../api";
import MultiSelectField from "../../form/multiSelectField";
import RadioField from "../../form/radioField";
import SelectField from "../../form/selectField";
import TextField from "../../form/textField";
import BackHistoryButton from "../../table/backHistoryButton";

const UserEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const [data, setData] = useState();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users.update(userId, data);
        history.push(`/users/${userId}`);
    };
    const handleChange = (target) => {
        const data = target.value;
        if (target.name === "qualities") {
            const transformQualities = Object.keys(target.value).map((q) => ({
                _id: data[q].value,
                name: data[q].label,
                color: data[q].color
            }));
            setData((prevState) => ({ ...prevState, [target.name]: transformQualities }));
        } else if (target.name === "profession") {
            const findProf = professions.filter(p => (p.value === target.value))[0];
            const transformProfession = {
                _id: findProf.value,
                name: findProf.label
            };
            setData((prevState) => ({ ...prevState, [target.name]: transformProfession }));
        } else setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    return <>
        {data && professions && qualities
            ? (
                <div className="container mt-5">
                    <BackHistoryButton />
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
