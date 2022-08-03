import React from "react";
import PostAuth from "../users/PostAuth";
import TimeAgo from "../TimeAgo";
import ReactionsButtons from "../ReactionsButtons";
const PostExcerpt = ({post}) => {
  return (
    <article
      className="mb-1 border rounded border-white bg-light p-4"
    >
      <h3>{post.title}</h3>
      <p className="float-left">
        <PostAuth userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <p>{post.body.substring(0,100)}</p>
      <hr></hr>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
