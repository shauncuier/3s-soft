import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Blogs from "../Pages/Blogs/Blogs";
import Contact from "../Pages/Contact/Contact";
import CookiePolicy from "../Pages/CookiePolicy/CookiePolicy";
import NotFound from "../Pages/Error/NotFound";
import Home from "../Pages/Home/Home";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import Services from "../Pages/Services/Services";
import Team from "../Pages/Team/Team";
import TermsOfService from "../Pages/TermsOfService/TermsOfService";

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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
