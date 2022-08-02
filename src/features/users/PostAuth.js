import React from 'react';
import { useSelector } from 'react-redux';
import {selectAllUsers} from './userSlice'
const PostAuth = ({userId})=> {
    const users = useSelector(selectAllUsers);
    const author = users.find(user => user.id === userId)
    return (
        <span className='font-weight-light'>
            by {author ? author.name : 'Unknown author'}
        </span>
    );
}

export default PostAuth;