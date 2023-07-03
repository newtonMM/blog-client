import React from "react";

import Hero from "../../components/Hero";
import ArticlesDisplay from "../../components/ArticlesDisplay";

const Homepage: React.FC = () => {
  return (
    <>
      <Hero />
      <ArticlesDisplay />
    </>
  );
};

export default Homepage;
