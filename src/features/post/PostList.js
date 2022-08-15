import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {selectAllPosts, getPostStatus, getpostError,fetchPost} from "./post_slice"
import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const dispatch = useDispatch();


  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostStatus);
  const postsError = useSelector(getpostError);

  useEffect(()=>{
    if(postsStatus === 'idle'){
      dispatch(fetchPost());
    }
  },[postsStatus, dispatch])
  const numberofPost = posts.length;
  //compares dates and returns a positive or negative 1 to the sort function,
  //then creates a shallow copy of the posts array.

  let content;
  if (postsStatus === 'loading'){
    content = <p>Loading..</p>;
  }else if (postsStatus === 'succeeded'){
    const orderedPost = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
    content = orderedPost.map((post)=> <PostExcerpt key={post.id} post={post}/>)
  }else if (postsStatus === 'failed'){
    content = <p>{postsError}</p>
  }

  return (
    <>
    <div style={{width:'600px'}} className="m-auto mt-4">
      <h2 className="pb-4">Post {`(${numberofPost})`}</h2>
      {content}
    </div>
    
    </>
    
  );
};

export default PostList;
