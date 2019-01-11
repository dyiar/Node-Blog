import React from 'react';
import { Link } from 'react-router-dom';

const User = props => {
    return (
        <Link to={`/users/posts/${props.user.id}`} onClick={() => props.getPosts(props.user.id)}>
        <div className="solo-name">
            {props.user.name}
        </div>
        </Link>
    )
}

export default User;