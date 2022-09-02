import React from "react";
import { useSelector} from "react-redux";
import {selectPostIds, getPostStatus, getpostError} from "./post_slice"
import PostExcerpt from "./PostExcerpt";

const PostList = () => {


  const orderPostsIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostStatus);
  const postsError = useSelector(getpostError);
  const numberofPost = orderPostsIds.length;
  //compares dates and returns a positive or negative 1 to the sort function,
  //then creates a shallow copy of the posts array.

  let content;
  if (postsStatus === 'loading'){
    content = <p>Loading..</p>;
  }else if (postsStatus === 'succeeded'){
    content = orderPostsIds.map((postId)=> <PostExcerpt key={postId} postId={postId}/>)
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
