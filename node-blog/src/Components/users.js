import React from 'react';
import { Link } from 'react-router-dom';

const Users = props => {
    return(
        <div>
            {props.users.map(user => {
                return (
                    <Link to={`/users/${user.id}`} key={user.id}
                    onClick={() => props.getUser(user.id)}>
                    <div className="name-list">
                        {user.name}
                    </div>
                    </Link>
                )
            })}
        </div>
    )

}

export default Users;