import React, { useEffect, useState } from "react";
import AdminArticleCard from "./AdminArticleCard";

interface ArticleId {
  id: string;
  category_name: string;
  date_published: string;
  description: string;
  image_url: string;
  title: string;
}
const Dashboard: React.FC = () => {
  const [authorArticles, setAuthorArticles] = useState<ArticleId[]>([]);

  const getAuthorArticles = async () => {
    const response = await fetch(
      "http://localhost:3000/allArticlesFromAuthor",
      {
        credentials: "include",
      }
    );
    const { data } = await response.json();
    setAuthorArticles(data);
    console.log(data);
  };

  useEffect(() => {
    getAuthorArticles();
  }, []);

  const onDelete = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/delete-article/` + `${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      const updatedState = authorArticles.filter((item) => item.id !== id);
      setAuthorArticles(updatedState);
    } else {
      console.log(response);
    }
  };

  const myArticles =
    authorArticles &&
    authorArticles.map((articles, index) => (
      <AdminArticleCard
        key={index}
        id={articles.id}
        imgSrc={articles.image_url}
        title={articles.title}
        published={articles.date_published}
        category={articles.category_name}
        description={articles.description}
        onDelete={onDelete}
      />
    ));
  return (
    <div>
      <div className="flex gap-2 justify-center items-center mt-4 p-2">
        <div className="p-2 bg-white text-black ">My articles</div>
        <div className="p-2 bg-white text-black">My series</div>
        <div className="p-2 bg-white text-black">Create new Series</div>
        <div className="p-2 bg-white text-black">Create new Article</div>
      </div>
      <div id="articles" className="flex flex-col mt-5 p-4">
        <h1 className="text-center text-3xl font-bold ">Your Articles </h1>
        <div className="flex flex-col  gap-2 items-center justify-center">
          {myArticles}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
