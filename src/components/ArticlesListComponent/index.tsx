import React from "react";
interface Items {
  imgSrc: string;
  title: string;
  published: string;
  category: string;
}

const ArticleCard = (props: Items) => {
  //   function getImgUrl(name:string) {
  //     return new URL(`${name}`, import.meta.url).href
  //  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={`${props.imgSrc}`} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <div className="card-actions justify-end">
          <div className="">{props.category}</div>
          <div className="">{props.published}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
