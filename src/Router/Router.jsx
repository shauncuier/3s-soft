import { createBrowserRouter } from "react-router";
import React, { lazy, Suspense } from "react";
import RootLayout from "../Layout/RootLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Loading from "../Components/Loading";

// Custom lazy function to handle module loading errors (e.g., after a new deployment)
const lazyRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem("page-has-been-force-refreshed") || "false"
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem("page-has-been-force-refreshed", "false");
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem("page-has-been-force-refreshed", "true");
        window.location.reload();
        // Return a promise that never resolves so it doesn't render until reload
        return new Promise(() => {});
      }
      throw error;
    }
  });

// Lazy Load Pages for Zero Loading Performance
const Home = lazyRetry(() => import("../Pages/Home/Home"));
const Contact = lazyRetry(() => import("../Pages/Contact/Contact"));
const NotFound = lazyRetry(() => import("../Pages/Error/NotFound"));
const PrivacyPolicy = lazyRetry(() => import("../Pages/Compliance/Protection"));
const TermsOfService = lazyRetry(() => import("../Pages/Compliance/Agreement"));
const CookiePolicy = lazyRetry(() => import("../Pages/Compliance/Legal"));
const Team = lazyRetry(() => import("../Pages/Team/Team"));
const Blogs = lazyRetry(() => import("../Pages/Blogs/Blogs"));
const AboutUs = lazyRetry(() => import("../Pages/AboutUs/AboutUs"));
const Services = lazyRetry(() => import("../Pages/Services/Services"));
const ServiceDetails = lazyRetry(() => import("../Pages/Services/ServiceDetails"));
const AddBlog = lazyRetry(() => import("../Pages/Admin/AddBlog/AddBlog"));
const Portfolio = lazyRetry(() => import("../Pages/Portfolio/Portfolio"));
const PortfolioDetails = lazyRetry(() => import("../Pages/Portfolio/PortfolioDetails"));
const BlogDetails = lazyRetry(() => import("../Pages/Blogs/BlogDetails/BlogDetails"));
const DashboardLayout = lazyRetry(() => import("../Layout/DashboardLayout"));
const DashboardProfile = lazyRetry(() => import("../Pages/Admin/DashboardProfile/DashboardProfile"));
const Login = lazyRetry(() => import("../Pages/Authentication/Login/Login"));
const Register = lazyRetry(() => import("../Pages/Authentication/Register/Register"));

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
