import React from "react";
import SubmissionForm from "./components/SubmissionForm";
import PostList from "./features/post/PostList";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SubmissionForm />}></Route>
        <Route path="posts" element={<PostList />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
