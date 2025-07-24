import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../Pages/Error/NotFound";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../Pages/TermsOfService/TermsOfService";
import CookiePolicy from "../Pages/CookiePolicy/CookiePolicy";
import Team from "../Pages/Team/Team";
import Services from "../Pages/Services/Services";
import Blogs from "../Pages/Blogs/Blogs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AddBlog from "../Pages/Admin/AddBlog/AddBlog";
import BlogDetails from "../Pages/Blogs/BlogDetails/BlogDetails";

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
        path: "/blog/:id",
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
        path: "/add-blog",
        Component: AddBlog,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
