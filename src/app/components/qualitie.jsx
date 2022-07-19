import React from "react";

const Qualitie = ({ color, name }) => {
    return <span className={"m-2 badge bg-" + color}>{name}</span>;
};

export default Qualitie;
