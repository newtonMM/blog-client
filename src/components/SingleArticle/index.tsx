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
    <div className="flex flex-col justify-center items-center w-[100vw] text-white bg-base-200 pt-4">
      <div className="p-2 ">
        <h1 className="font-bold text-center text-5xl text-white">
          {props.title}
        </h1>
      </div>
      <div className="w-[50vw]">
        <img
          src={`${props.image_url}`}
          className="object-cover h-[70vh] w-full mx-4"
        />
      </div>
      <div className="p-2 justify-start flex flex-col lg:w-[50vw] w-full ml-10 ">
        <p className="text-left italic">{props.description}</p>
        <p className="text-left italic">By {props.author}</p>
        <p className="text-left italic">{props.date_published}</p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: props.content }}
        className="p-4 mx-4 lg:w-[50vw] w-full"
      />
    </div>
  );
};

export default SingleArticle;
