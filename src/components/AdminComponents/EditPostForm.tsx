import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import * as Quill from "quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
interface ArticleData {
  title: string;
  image_url: string;
  description: string;
  author: string;
  date_published: string;
  content: string;
  id: string;
  category_name: string;
}
type categories = {
  id: string;
  name: string;
};

const EditPostForm = () => {
  const { id } = useParams();
  const [artcicle, setArticle] = useState<ArticleData>();
  const [categoriesOptions, setCategoriesOptions] = useState<categories[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:3000/get-article/" + `${id}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      // setIsloading(false)
      const { data } = await response.json();
      //   const arts = { ...data };
      console.log("this is the data ", data);
      setArticle({ ...data });
    } else {
      console.log(response);
    }
  };
  const fetchcategories = async () => {
    const response = await fetch("http://localhost:3000/all-categories");
    if (response.ok) {
      const data = await response.json();
      const itms = data.response;
      const ctgrs = [{ id: "", name: "select category" }, ...itms];
      setCategoriesOptions(ctgrs);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    fetchData();
    fetchcategories();
  }, []);

  const options =
    categoriesOptions.length > 0 &&
    categoriesOptions.map((category, index) => (
      <option key={index} value={category.id}>
        {category.name}
      </option>
    ));

  const defaultOptionValue =
    categoriesOptions &&
    artcicle &&
    categoriesOptions.find((itm) => itm.name === artcicle?.category_name);

  const onDescriptionChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setDescription(event.currentTarget.value.trim());
  };

  const onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.currentTarget.value.trim());
  };
  const onImageSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.currentTarget.files![0];
    console.log(file);
    setSelectedFile(file);
  };
  const onContentChangeHandler = (
    value: string,
    delta: Quill.Delta,
    source: Quill.Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    const contentHtml = editor.getHTML();
    setContent(contentHtml);
  };
  // const getHTML=(editor:UnprivilegedEditor)=>{

  // }
  const onCategoryChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();

    setCategory(event.currentTarget.value);
  };

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

    if (title !== "") {
      formData.append("title", title);
    } else if (artcicle?.title !== undefined) {
      formData.append("title", artcicle.title);
    }

    if (selectedFile !== "") {
      formData.append("image", selectedFile);
    } else if (artcicle?.image_url !== undefined) {
      formData.append("image_url", artcicle.image_url);
    }

    if (category !== "") {
      formData.append("category_id", category);
    } else if (defaultOptionValue?.id !== undefined) {
      formData.append("category_id", defaultOptionValue.id);
    }

    if (content !== "") {
      formData.append("content", content);
    } else if (artcicle?.content !== undefined) {
      formData.append("content", artcicle.content);
    }

    if (description !== "") {
      formData.append("description", description);
    } else if (artcicle?.description !== undefined) {
      formData.append("description", artcicle.description);
    }

    console.log(formData.get("category_id"));

    const response = await fetch(
      "http://localhost:3000/update-article/" + `${id}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );
    if (response.ok) {
      console.log("updated successfully");
      <Navigate to="/admin" />;
    } else {
      console.log("failed", response);
    }
  };

  return (
    <div>
      <div>
        <h1>Edit your Post</h1>
      </div>
      <form onSubmit={createPost}>
        <div>
          <label>Title</label>
          <input
            type="text"
            defaultValue={artcicle?.title}
            onChange={onTitleChangeHandler}
          ></input>
        </div>
        <div>
          <label>Image </label>
          <input
            type="file"
            defaultValue={artcicle?.image_url}
            onChange={onImageSelectHandler}
          ></input>
        </div>
        <div>
          <label>Excerpt</label>
          <input
            type="text-area"
            defaultValue={artcicle?.description}
            onChange={onDescriptionChangeHandler}
            placeholder="a short extract of the content or a description of the article"
          ></input>
        </div>
        <div>
          <label>category</label>
          <select
            value={defaultOptionValue?.id}
            onChange={onCategoryChangeHandler}
          >
            {options}
          </select>
        </div>
        <div>
          <ReactQuill
            value={artcicle?.content}
            onChange={onContentChangeHandler}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditPostForm;
