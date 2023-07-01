import Homepage from "../containers/HomePage/Homepage";
import Loginform from "../components/Loginpage/Loginform";

const PublicRoutes = [
  {
    path: "/homepage",
    component: Homepage,
    exact: true,
  },
  {
    path: "/login",
    component: Loginform,
    exact: true,
  },
];

export default PublicRoutes;
