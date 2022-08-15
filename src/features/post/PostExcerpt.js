import React from "react";
import PostAuth from "../users/PostAuth";
import TimeAgo from "../TimeAgo";
import ReactionsButtons from "../ReactionsButtons";

import { Link } from "react-router-dom";
const PostExcerpt = ({post}) => {
  return (
    <>
    <article
      className="mb-1 border rounded border-white bg-light p-4"
    >
      <h3>{post.title}</h3>
      <p className="float-left">
        <PostAuth userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <p>{post.body.substring(0,75)}...</p>
      <Link to={`${post.id}`}>View Post</Link>
      <hr></hr>
      <ReactionsButtons post={post} />
    </article>
    </>
    
  );
};

export default PostExcerpt;
