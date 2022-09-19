import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, value, onChange, error, name }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>
                {label}
            </label>
            <textarea
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            />
            { error && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    );
};
TextAreaField.defaultProps = {
    type: "text"
};
TextAreaField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
