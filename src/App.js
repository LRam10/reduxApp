import React from "react";
import SubmissionForm from "./components/SubmissionForm";
import PostList from "./features/post/PostList";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePostPage from "./components/SinglePostPage";
import EditPost from "./features/post/EditPost";
const App = () => {
  return (
    <Routes>
      {/* Nested Routes(New ReactRouter V6) index defines the default layout to show. Checkout Layout Component */}
      <Route path="/" element={<Layout />}>
        <Route index element={<SubmissionForm />}></Route>
        <Route path="posts" element={<PostList />}></Route>
        <Route path="/posts/:postId" element={<SinglePostPage />}></Route>
        <Route path="/post/edit/:postId" element={<EditPost />}></Route>
        <Route
          path="*"
          element={
            <div>
              <p>There's Nothing Here</p>
            </div>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default App;
