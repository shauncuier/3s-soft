import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../Pages/Error/NotFound";
import PrivacyPolicy from "../Pages/Compliance/Protection";
import TermsOfService from "../Pages/Compliance/Agreement";
import CookiePolicy from "../Pages/Compliance/Legal";
import Team from "../Pages/Team/Team";
import Services from "../Pages/Services/Services";
import Blogs from "../Pages/Blogs/Blogs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AddBlog from "../Pages/Admin/AddBlog/AddBlog";
import BlogDetails from "../Pages/Blogs/BlogDetails/BlogDetails";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardProfile from "../Pages/Admin/DashboardProfile/DashboardProfile";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

let router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound />, // Import NotFound component here
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/team",
        Component: Team,
      },
      {
        path: "/blogs",
        Component: Blogs,
      },
      {
        path: "/blog/:slug",
        Component: BlogDetails,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "/terms-of-service",
        Component: TermsOfService,
      },
      {
        path: "/cookies",
        Component: CookiePolicy,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <DashboardProfile></DashboardProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
