import React from "react";

const Qualities = (qualities) => {
    return (
        qualities.map(quality => (
            <span className={"m-2 badge bg-" + quality.color}>
                        {quality.name}
                    </span>))
    )
}

export default Qualities