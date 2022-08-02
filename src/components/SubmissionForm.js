import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../features/post/post_slice";
import { selectAllUsers } from "../features/users/userSlice";
const SubmissionForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  const userList = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  const onSavePost = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };
  return (
    <div>
      <Form style={{ width: "600px" }} className="m-auto mt-4">
        <h3>Create a New Post</h3>
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
        <Form.Group className="mb-3">
          <Form.Label htmlFor="user">User</Form.Label>
          <Form.Select
            id="user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value=''></option>
            {userList}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" 
        onClick={onSavePost}
        disabled={!canSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default SubmissionForm;
