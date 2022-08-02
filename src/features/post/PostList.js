import React from "react";
import { useSelector } from "react-redux";
import {selectAllPosts} from "./post_slice"
import PostAuth from "../users/PostAuth";
import TimeAgo from "../TimeAgo";
import ReactionsButtons from "../ReactionsButtons";
const PostList = () => {
  const posts = useSelector(selectAllPosts);

  const numberofPost = posts.length;
  //compares dates and returns a positive or negative 1 to the sort function,
  //then creates a shallow copy of the posts array.
  const orderedPost = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

  const renderedPost = orderedPost.map((post) => (
    <article key={post.id} className='mb-1 border rounded border-white bg-light p-4'>
      <h3>{post.title}</h3>
      <p className="float-left">
          <PostAuth userId={post.userId}/>
          <TimeAgo timestamp={post.date}/>
      </p>
      <p>{post.content}</p>
      <hr></hr>
      <ReactionsButtons post={post}/>
    </article>
  ));
  return (
    <div style={{width:'600px'}} className="m-auto mt-4">
      <h2 className="pb-4">Post {`(${numberofPost})`}</h2>
      {renderedPost}
    </div>
  );
};

export default PostList;
