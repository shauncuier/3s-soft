import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import router from "./Router/Router";
import AuthProvider from "./Provider/AuthProvider";
import { registerSW } from 'virtual:pwa-register';

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

async function clearLocalServiceWorkers() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));

  if ("caches" in window) {
    const cacheKeys = await window.caches.keys();
    await Promise.all(cacheKeys.map((cacheKey) => window.caches.delete(cacheKey)));
  }
}

if (isLocalhost) {
  clearLocalServiceWorkers().catch((error) => {
    console.warn("Failed to clear local service workers:", error);
  });
} else {
  // Register service worker for deployed PWA usage only
  registerSW({ immediate: true });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
