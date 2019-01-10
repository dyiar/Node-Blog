import React from 'react';
import User from './user';
import { Link } from 'react-router-dom';

const Users = props => {
    return(
        <div>
            {props.users.map(user => {
                return (
                    <Link to={`/users/${user.id}`} key={user.id}>
                    <User 
                    user={user}
                    name={user.name}/>
                    </Link>
                )
            })}
        </div>
    )

}

export default Users;