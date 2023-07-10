import React, { useContext } from "react";
import { ArticleContext } from "../../store/article-context";
import ArticleCard from "../ArticlesListComponent";

const ArticlesDisplay: React.FC = (props) => {
  const artCtx = useContext(ArticleContext);

  const cards =
    artCtx.articles.length > 0 &&
    artCtx.articles.map((artcicle, index) => (
      <ArticleCard
        key={index}
        id={artcicle.id}
        imgSrc={artcicle.image_url}
        title={artcicle.title}
        published={artcicle.date_updated.substring(0, 16).replace("T", " ")}
        category={artcicle.category_name}
        description={artcicle.description}
      />
    ));

  // artCtx.articles.length > 0 &&
  // artCtx.articles.map((artcicle, index) => (
  //   <div>
  //     <ArticleCard
  //       key={index}
  //       imgSrc="http://localhost:3000/images/2023-06-30T07:21:48.948Z-sunset.jpg"
  //       title={artcicle.title}
  //       published={artcicle.date_updated.substring(0, 16).replace("T", " ")}
  //       category={artcicle.category_id}
  //     />
  //   </div>
  // ));

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center bg-base-50">
      {cards}
    </div>
  );
};

export default ArticlesDisplay;
