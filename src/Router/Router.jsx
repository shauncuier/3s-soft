import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../Pages/Error/NotFound";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";

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
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;