import React from "react";

const SearchStatus = ({length}) => {
    if(!length) {
        return <h1 className="btn btn-danger m-2">Сегодня никто с тобой не тусанет</h1>
    } else if((length%10 === 1 && (length === 1 || length > 20))
        || (length > 4 && length < 11)
        || (length > 10 && length < 15) ) {
        return <h1 className="btn btn-primary m-2">{length} человек тусанет с тобой сегодня</h1>
    } else {
        return <h1 className="btn btn-primary m-2">{length} человека тусанет с тобой сегодня</h1>
    }
}

export default SearchStatus
