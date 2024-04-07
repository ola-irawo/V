import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { fetchPosts } from "./features/home";
import { getAllUser } from "./services/user/actions/getAllUser";
import { getAllSociety } from "./services/societies/action/getAllSociety";
import { getPostsBySearch } from "./services/post/actions/crud/getPostsBySearch";
import { getCurrentUser } from "./libs/getCurrentUser";
import { getAllUserBios } from "./services/bio/actions/getAllUserBios";
import { getUserById } from "./services/user/actions/getUserById";

const currentUser = getCurrentUser();
if (currentUser && Object.keys(currentUser).length > 0) {
  await store.dispatch(fetchPosts());
  store.dispatch(getAllUser());
  store.dispatch(getAllSociety());
  store.dispatch(getAllUserBios());
  store.dispatch(getUserById());
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
