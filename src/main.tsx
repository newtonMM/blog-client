import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ArticleContextProvider from "./store/article-context.tsx";
import { AuthContextProvider } from "./store/auth-context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ArticleContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ArticleContextProvider>
  </React.StrictMode>
);
