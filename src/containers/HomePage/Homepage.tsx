import React from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import ArticlesDisplay from "../../components/ArticlesDisplay";
import CreatePostForm from "../Admin/CreatePost/Create-post-form";

const Homepage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CreatePostForm />
      <ArticlesDisplay />
    </>
  );
};

export default Homepage;
