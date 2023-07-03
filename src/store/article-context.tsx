import React, { ReactNode, useState, useEffect } from "react";
import { IArticle } from "../@types/IArticles";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

type ArticleContextObj = {
  articles: IArticle[];
  addArticle: (data: FormData) => void;
  removeArticle: (id: string) => void;
  updateArticle: (id: string) => void;
};

export const ArticleContext = React.createContext<ArticleContextObj>({
  articles: [],
  addArticle: () => {},
  removeArticle: (id: string) => {},
  updateArticle: (id: string) => {},
});

const ArticleContextProvider: React.FC<{ children?: ReactNode | undefined }> = (
  props
) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  // const navigate = useNavigate();

  const fetchArticles = async () => {
    const response = await fetch("http://localhost:3000/all-articles");
    const data = await response.json();
    const mappedArticles = data.response.map((itsm: IArticle) => ({
      id: itsm.id,
      image_url: itsm.image_url,
      content: itsm.content,
      author_id: itsm.author_id,
      title: itsm.title,
      category_name: itsm.category_name,
      series_id: itsm.series_name,
      date_updated: itsm.date_updated,
      date_published: itsm.date_published,
      description: itsm.description,
    }));
    console.log(mappedArticles);
    setArticles(mappedArticles);
    // console.log(data.response);
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  const addNewArticleHandle = async (data: FormData) => {
    const response = await fetch("http://localhost:3000/create-article", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      <Navigate to="/admin" />;
      // navigate("/admin");
    }
    console.log(response);
  };
  const deleteArticleHandler = () => {};
  const updateArticlehandle = () => {};

  const contextValues: ArticleContextObj = {
    articles: articles,
    addArticle: addNewArticleHandle,
    removeArticle: deleteArticleHandler,
    updateArticle: updateArticlehandle,
  };

  return (
    <ArticleContext.Provider value={contextValues}>
      {props.children}
    </ArticleContext.Provider>
  );
};
export default ArticleContextProvider;
