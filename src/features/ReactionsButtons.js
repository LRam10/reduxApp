import React from 'react';
import {useAddReactionMutation} from './post/post_slice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow:'😮',
    heart:'❤️',
    rocket:'🚀',
    tea:'🫖',
}
const ReactionsButtons =({post})=> {
    const [addReaction] = useAddReactionMutation();
    const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji])=>{
        return(
            <button
            key={name}
            type='button'
            className='btn btn-dark m-1 p-1 '
            onClick={()=>{
                const newValue = post.reactions[name] +1;
                addReaction({postId:post.id, reactions:{...post.reactions, [name]:newValue}})
            }}>
                {/* this ho to access and value in an object using the bracket notation */}
                {emoji} {post.reactions[name]} 
            </button>
        )
    })

    return (
        <div className='mb-2'>
            {reactionButtons}
        </div>
    );
}

export default ReactionsButtons;