import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import userReducer from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import blogReducer from "./reducers/blogReducer";
import SingleBlog from "./components/SingleBlog";

const store = configureStore({
  reducer: {
    users: userReducer,
    blogRoute: blogReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blogs/" element={<App />} />
        <Route exact path="/write" element={<BlogForm />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </Router>
  </Provider>
);
