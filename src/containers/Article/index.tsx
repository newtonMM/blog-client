import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleArticle from "../../components/SingleArticle";

interface ArticleData {
  title: string;
  image_url: string;
  description: string;
  author_username: string;
  date_published: string;
  content: string;
  id: string;
}

const AriclePage: React.FC = () => {
  const [artcicle, setArticle] = useState<ArticleData>();
  const [isLoading, setIsloading] = useState(true);

  const { id } = useParams();
  console.log("this is the ", id);
  const fetchArticle = async () => {
    const response = await fetch(
      `http://localhost:3000/get-article/` + `${id}`
    );
    if (response.ok) {
      // setIsloading(false)
      const { data } = await response.json();
      //   const arts = { ...data };
      console.log(data);
      setArticle({ ...data });
      setIsloading(false);
      console.log(artcicle);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);
  return (
    <>
      {isLoading ? (
        <div>loading ......</div>
      ) : (
        artcicle && (
          <SingleArticle
            title={artcicle.title}
            image_url={artcicle.image_url}
            description={artcicle.description}
            author={artcicle.author_username}
            content={artcicle.content}
            id={artcicle.id}
            date_published={artcicle.date_published}
          />
        )
      )}
    </>
  );
};

export default AriclePage;
