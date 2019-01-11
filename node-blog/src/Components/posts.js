import React from 'react';

const Posts = props => {
    return (
        <div>
        {props.posts.map(post => {
            return (
                <div className="name-list" key={post.id}>
                    {post.text}
                    
                </div>
            )
        })}
    </div>
    )
}

export default Posts;