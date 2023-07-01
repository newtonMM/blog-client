import React, { useContext } from "react";
import { ArticleContext } from "../../store/article-context";
import ArticleCard from "../ArticlesListComponent";

const ArticlesDisplay: React.FC = (props) => {
  const artCtx = useContext(ArticleContext);

  const cards = () => {
    if (artCtx.articles.length > 0) {
      return artCtx.articles.map((artcicle, index) => {
        return (
          <ArticleCard
            key={index}
            imgSrc="http://localhost:3000/images/2023-06-30T07:21:48.948Z-sunset.jpg"
            title={artcicle.title}
            published={artcicle.date_updated.substring(0, 16).replace("T", " ")}
            category={artcicle.category_name}
          />
        );
      });
    }
  };

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

  return <div>{cards()}</div>;
};

export default ArticlesDisplay;
