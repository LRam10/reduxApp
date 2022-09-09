import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { extendedApiSlice } from "./features/post/post_slice";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchUsers} from "./features/users/userSlice";;

//cmd + / => comment out selected block
//cmd + d => Selecte all similiar selected text
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())

store.dispatch(fetchUsers());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </Router>
  </React.StrictMode>
);