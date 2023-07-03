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
      <div>
        <div>My articles</div>
        <div>My series</div>
        <div>Create new Series</div>
        <div>Create new Article</div>
      </div>
      <div>
        <h1>Your Articles </h1>
        <div>{myArticles}</div>
      </div>
    </div>
  );
};

export default Dashboard;
