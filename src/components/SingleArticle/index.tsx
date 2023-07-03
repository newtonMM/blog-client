import React from "react";

interface ArticleData {
  title: string;
  image_url: string;
  description: string;
  author: string;
  date_published: string;
  content: string;
  id: string;
}

const SingleArticle: React.FC<ArticleData> = (props) => {
  return (
    <>
      <div>
        <h1>{props.title}</h1>
      </div>
      <div>
        <img src={`${props.image_url}`} />
      </div>
      <div>
        <p>{props.description}</p>
        <p>{props.author}</p>
        <p>{props.date_published}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </>
  );
};

export default SingleArticle;
