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
      className="card w-96 h-[65vh] p-2 mb-2 overflow-hidden bg-base-100 shadow-xl"
      onClick={() => navigate(`${props.id}`)}
    >
      <figure className="h-1/2">
        <img src={`${props.imgSrc}`} className="object-contain" alt="Shoes" />
      </figure>
      <div className="card-body h-1/2">
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
