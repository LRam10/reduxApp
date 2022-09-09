import React from "react";
import { useSelector} from "react-redux";
import {selectPostIds, getPostStatus, getpostError} from "./post_slice"
import PostExcerpt from "./PostExcerpt";
import { useGetPostsQuery } from "./post_slice";

const PostList = () => {

  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();

  const orderPostsIds = useSelector(selectPostIds);
  const numberofPost = orderPostsIds.length;
  //compares dates and returns a positive or negative 1 to the sort function,
  //then creates a shallow copy of the posts array.

  let content;
  if (isLoading){
    content = <p>Loading..</p>;
  }else if (isSuccess){
    content = orderPostsIds.map((postId)=> <PostExcerpt key={postId} postId={postId}/>)
  }else if (isError){
    content = <p>{error}</p>
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
