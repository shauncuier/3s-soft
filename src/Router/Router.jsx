import { createBrowserRouter } from "react-router";
import React, { lazy, Suspense } from "react";
import RootLayout from "../Layout/RootLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Loading from "../Components/Loading";

// Lazy Load Pages for Zero Loading Performance
const Home = lazy(() => import("../Pages/Home/Home"));
const Contact = lazy(() => import("../Pages/Contact/Contact"));
const NotFound = lazy(() => import("../Pages/Error/NotFound"));
const PrivacyPolicy = lazy(() => import("../Pages/Compliance/Protection"));
const TermsOfService = lazy(() => import("../Pages/Compliance/Agreement"));
const CookiePolicy = lazy(() => import("../Pages/Compliance/Legal"));
const Team = lazy(() => import("../Pages/Team/Team"));
const Blogs = lazy(() => import("../Pages/Blogs/Blogs"));
const AboutUs = lazy(() => import("../Pages/AboutUs/AboutUs"));
const Services = lazy(() => import("../Pages/Services/Services"));
const ServiceDetails = lazy(() => import("../Pages/Services/ServiceDetails"));
const AddBlog = lazy(() => import("../Pages/Admin/AddBlog/AddBlog"));
const Portfolio = lazy(() => import("../Pages/Portfolio/Portfolio"));
const PortfolioDetails = lazy(() => import("../Pages/Portfolio/PortfolioDetails"));
const BlogDetails = lazy(() => import("../Pages/Blogs/BlogDetails/BlogDetails"));
const DashboardLayout = lazy(() => import("../Layout/DashboardLayout"));
const DashboardProfile = lazy(() => import("../Pages/Admin/DashboardProfile/DashboardProfile"));
const Login = lazy(() => import("../Pages/Authentication/Login/Login"));
const Register = lazy(() => import("../Pages/Authentication/Register/Register"));

// Wrapper for Lazy Components
const LazyPage = ({ Component }) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

let router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <LazyPage Component={NotFound} />,
    children: [
      {
        index: true,
        element: <LazyPage Component={Home} />,
      },
      {
        path: "/services",
        element: <LazyPage Component={Services} />,
      },
      {
        path: "/services/:slug",
        element: <LazyPage Component={ServiceDetails} />,
      },
      {
        path: "/team",
        element: <LazyPage Component={Team} />,
      },
      {
        path: "/blogs",
        element: <LazyPage Component={Blogs} />,
      },
      {
        path: "/blog/:slug",
        element: <LazyPage Component={BlogDetails} />,
      },
      {
        path: "/about-us",
        element: <LazyPage Component={AboutUs} />,
      },
      {
        path: "/contact",
        element: <LazyPage Component={Contact} />,
      },
      {
        path: "/portfolio",
        element: <LazyPage Component={Portfolio} />,
      },
      {
        path: "/portfolio/:slug",
        element: <LazyPage Component={PortfolioDetails} />,
      },
      {
        path: "/privacy-policy",
        element: <LazyPage Component={PrivacyPolicy} />,
      },
      {
        path: "/terms-of-service",
        element: <LazyPage Component={TermsOfService} />,
      },
      {
        path: "/cookies",
        element: <LazyPage Component={CookiePolicy} />,
      },
      {
        path: "/login",
        element: <LazyPage Component={Login} />,
      },
      {
        path: "/register",
        element: <LazyPage Component={Register} />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <LazyPage Component={DashboardLayout} />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <LazyPage Component={DashboardProfile} />
          </PrivateRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <PrivateRoute>
            <LazyPage Component={AddBlog} />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <LazyPage Component={NotFound} />,
  },
]);

export default router;
