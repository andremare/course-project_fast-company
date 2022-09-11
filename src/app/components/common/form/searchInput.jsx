import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ onChange, value }) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                className="w-100"
                placeholder="Search..."
                onChange={onChange}
            />
        </div>
    );
};

SearchInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default SearchInput;
