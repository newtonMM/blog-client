import React from "react";
import { useNavigate } from "react-router-dom";
interface Items {
  id: string;
  imgSrc: string;
  title: string;
  published: string;
  category: string;
  description: string;
}

const ArticleCard: React.FC<Items> = (props) => {
  const navigate = useNavigate();
  //   function getImgUrl(name:string) {
  //     return new URL(`${name}`, import.meta.url).href
  //  }

  return (
    <div
      className="card w-96 bg-base-100 shadow-xl"
      onClick={() => navigate(`${props.id}`)}
    >
      <figure>
        <img src={`${props.imgSrc}`} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          <div className="">{props.category}</div>
          <div className="">{props.published}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
