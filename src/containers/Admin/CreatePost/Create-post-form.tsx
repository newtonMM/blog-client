import React, { ReactHTML, useEffect, useState, useContext } from "react";
import ReactQuill from "react-quill";
import * as Quill from "quill";
import "react-quill/dist/quill.snow.css";
import { ArticleContext } from "../../../store/article-context";
type categories = {
  id: string;
  name: string;
};
// interface getContentChange:

const CreatePostForm = () => {
  const [categoriesOptions, setCategoriesOptions] = useState<categories[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [category, setCategory] = useState<string>("");

  const artCtx = useContext(ArticleContext);
  const fetchcategories = async () => {
    const response = await fetch("http://localhost:3000/all-categories");
    if (response.ok) {
      const data = await response.json();
      const itms = data.response;
      const ctgrs = [{ id: "", name: "select category" }, ...itms];
      setCategoriesOptions(ctgrs);
    }
  };

  useEffect(() => {
    fetchcategories();
  }, []);

  const options =
    categoriesOptions.length > 0 &&
    categoriesOptions.map((category, index) => (
      <option key={index} value={category.id}>
        {category.name}
      </option>
    ));

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", selectedFile);
    formData.append("category_id", category);
    formData.append("content", content);
    artCtx.addArticle(formData);
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
    console.log(event.currentTarget.value);
    setCategory(event.currentTarget.value);
  };
  const test = () => {
    console.log("test.....");
  };
  return (
    <div>
      <h1>CreatePost</h1>

      <div>
        <form onSubmit={createPost}>
          <div>
            <label>Title</label>
            <input type="text" onChange={onTitleChangeHandler}></input>
          </div>
          <div>
            <label>Image </label>
            <input type="file" onChange={onImageSelectHandler}></input>
          </div>
          <div>
            <label>category</label>
            <select onChange={onCategoryChangeHandler}>{options}</select>
          </div>
          <div>
            <ReactQuill onChange={onContentChangeHandler} />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
