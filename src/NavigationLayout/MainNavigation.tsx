import CreateCategory from "../containers/Admin/CreateCategory";
import CreatePostForm from "../containers/Admin/CreatePost/Create-post-form";
import Homepage from "../containers/HomePage/Homepage";
import Loginform from "../components/Loginpage/Loginform";
import PublicLayout from "./PublicLayout";
import AdminLayout from "./AdminLayout";
import AriclePage from "../containers/Article";
import Dashboard from "../components/AdminComponents/dashboard";
import EditPostForm from "../components/AdminComponents/EditPostForm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const MainNavigation = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Homepage /> },
        { path: "login", element: <Loginform /> },
        { path: ":id", element: <AriclePage /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: ":id/edit", element: <EditPostForm /> },
        { path: "create-post", element: <CreatePostForm /> },
        { path: "create-category", element: <CreateCategory /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
};

export default MainNavigation;
