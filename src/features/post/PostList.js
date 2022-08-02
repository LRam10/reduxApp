import React from "react";
import { useSelector } from "react-redux";
import {selectAllPosts} from "./post_slice"
import PostAuth from "../users/PostAuth";
import TimeAgo from "../TimeAgo";
const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const renderedPost = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p className="float-left">
          <PostAuth userId={post.userId}/>
          <TimeAgo timestamp={post.date}/>
      </p>
      <p>{post.content}</p>
    </article>
  ));
  return (
    <div style={{width:'600px'}} className="m-auto mt-4">
      <h2 className="pb-4">Post</h2>
      {renderedPost}
    </div>
  );
};

export default PostList;
