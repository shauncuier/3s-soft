import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import router from "./Router/Router";
import AuthProvider from "./Provider/AuthProvider";
import { registerSW } from 'virtual:pwa-register';

const CHUNK_ERROR_RELOAD_KEY = "3s-soft-chunk-error-reload";
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const getErrorMessage = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value.message === "string") {
    return value.message;
  }

  return String(value);
};

const isDynamicImportFailure = (value) => {
  const message = getErrorMessage(value);

  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS for/i.test(
    message
  );
};

const recoverFromChunkLoadError = () => {
  try {
    if (window.sessionStorage.getItem(CHUNK_ERROR_RELOAD_KEY) === "1") {
      return;
    }

    window.sessionStorage.setItem(CHUNK_ERROR_RELOAD_KEY, "1");
  } catch {
    // Ignore sessionStorage failures and still try a reload.
  }

  window.location.reload();
};

window.addEventListener(
  "error",
  (event) => {
    if (isDynamicImportFailure(event.error || event.message)) {
      recoverFromChunkLoadError();
    }
  },
  true
);

window.addEventListener("unhandledrejection", (event) => {
  if (isDynamicImportFailure(event.reason)) {
    event.preventDefault?.();
    recoverFromChunkLoadError();
  }
});

window.addEventListener(
  "load",
  () => {
    try {
      window.sessionStorage.removeItem(CHUNK_ERROR_RELOAD_KEY);
    } catch {
      // Ignore sessionStorage failures.
    }
  },
  { once: true }
);

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
