import React from 'react';

const User = props => {
    return (
        <div className="solo-name">
            {props.user.name}
        </div>
    )
}

export default User;