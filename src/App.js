import React from 'react';
import SubmissionForm from './components/SubmissionForm';
import PostList from './features/post/PostList';


const App= ()=> {
  return (
    <>
      <SubmissionForm/>
      <hr/>
      <PostList/>
    </>
  );

}

export default App;
