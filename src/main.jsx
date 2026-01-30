import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import router from "./Router/Router";
import AuthProvider from "./Provider/AuthProvider";
import { registerSW } from 'virtual:pwa-register';

// Register service worker for PWA
registerSW({ immediate: true });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
