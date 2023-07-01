import React from "react";
import CreateCategory from "../containers/Admin/CreateCategory";
import CreatePostForm from "../containers/Admin/CreatePost/Create-post-form";

const Layouts = [
  {
    path: "/admin/create-category",
    component: CreateCategory,
    exact: true,
    role: "admin",
    title: "create new category",
  },
  {
    path: "/admin/create-post",
    component: CreatePostForm,
    exact: true,
    role: "admin",
    title: "create new post",
  },
];

export default Layouts;
