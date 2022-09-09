import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useDeletePostMutation,useUpdatePostMutation } from "./post_slice";
import { selectPostById } from "./post_slice";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import ReactionsButtons from "../ReactionsButtons";

import PostAuth from "../users/PostAuth";
const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();
  const [updatePost, {isLoading}] = useUpdatePostMutation();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);


  const canSave = [title, content].every(Boolean) && !isLoading;

  const onDeletePost = async () => {
    try {
      await deletePost({id:post.id}).unwrap();
      setTitle("");
      setContent("");
      navigate("/posts");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } 
  };

  const onSavePost = async () => {
    if (canSave) {
      try {
          await updatePost({
            id: post.id,
            title,
            body: content,
            userId: post.userId,
            reactions: post.reactions,
          }).unwrap();

        setTitle("");
        setContent("");
        navigate(`/posts/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } 
    }
  };
  if (!post) {
    return <div>No Post Found!!</div>;
  }

  return (
    <div>
      <Form
        style={{ width: "600px" }}
        className="shadow-sm m-auto mt-4 p-4 border border-light"
      >
        <h3>Edit Post</h3>
        <PostAuth userId={post.userId} />
        <Form.Group className="mb-3">
          <Form.Label htmlFor="postTitle">Post Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="..."
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Text className="text-muted">
            What are you thinknig of today?.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="post">Post</Form.Label>
          <Form.Control
            type="text"
            placeholder="tell us more..."
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <ReactionsButtons post={post} />
        <Button variant="primary" onClick={onSavePost} disabled={!canSave}>
          Save
        </Button>
        <Button variant="danger" className="mx-3" onClick={onDeletePost}>
          Delete
        </Button>
      </Form>
    </div>
  );
};

export default EditPost;
