import React from "react";
import { useSelector } from "react-redux";

import { selectPostById } from "../features/post/post_slice";
import PostAuth from "../features/users/PostAuth";
import TimeAgo from "../features/TimeAgo";
import ReactionsButtons from "../features/ReactionsButtons";

const SinglePostPage = () => {
  //retrieve postId
  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <div>
        <h2>No Post Found!</h2>
      </div>
    );
  }
  return (
    <article className="mb-1 border rounded border-white bg-light p-4">
      <h3>{post.title}</h3>
      <p className="float-left">
        <PostAuth userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <p>{post.body}</p>
      <hr></hr>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
