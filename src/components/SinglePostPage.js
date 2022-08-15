import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectPostById } from "../features/post/post_slice";
import PostAuth from "../features/users/PostAuth";
import TimeAgo from "../features/TimeAgo";
import ReactionsButtons from "../features/ReactionsButtons";

import { Link } from "react-router-dom";
const SinglePostPage = () => {
  let { postId } = useParams();
  //retrieve postI;
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <div>
        <h2>No Post Found!</h2>
      </div>
    );
  }
  return (
    <article className="m-4 border rounded border-white bg-light p-4">
      <h1>{post.title.toUpperCase()}</h1>
      <p className="float-left">
        <PostAuth userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <p>{post.body}</p>
      <Link to= {`/post/edit/${post.id}`} >Edit Post</Link>
      <hr></hr>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
