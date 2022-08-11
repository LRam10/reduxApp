import React from 'react';
import {useDispatch} from 'react-redux'
import {reactionAdded} from './post/post_slice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow:'😮',
    heart:'❤️',
    rocket:'🚀',
    tea:'🫖',
}
const ReactionsButtons =({post})=> {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji])=>{
        return(
            <button
            key={name}
            type='button'
            className='btn btn-dark m-1 p-1 '
            onClick={()=>{
                dispatch(reactionAdded({postId:post.id,reaction:name}))
            }}>
                {/* this ho to access and value in an object using the bracket notation */}
                {emoji} {post.reactions[name]} 
            </button>
        )
    })

    return (
        <div>
            {reactionButtons}
        </div>
    );
}

export default ReactionsButtons;