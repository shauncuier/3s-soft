import { useEffect } from "react";
import { useLocation } from "react-router";
import Clarity from "@microsoft/clarity";

const DEFAULT_MEASUREMENT_ID = "G-JG742N2K6Z";
const DEFAULT_CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID ?? "";
const CLARITY_INIT_FLAG = "__3S_SOFT_CLARITY_INITIALIZED__";

const GoogleAnalytics = ({
  measurementId = DEFAULT_MEASUREMENT_ID,
  clarityProjectId = DEFAULT_CLARITY_PROJECT_ID,
}) => {
  const location = useLocation();

  useEffect(() => {
    const projectId =
      typeof clarityProjectId === "string" ? clarityProjectId.trim() : "";
    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

    if (
      !projectId ||
      typeof window === "undefined" ||
      isLocalhost ||
      window[CLARITY_INIT_FLAG]
    ) {
      return;
    }

    Clarity.init(projectId);
    window[CLARITY_INIT_FLAG] = true;
  }, [clarityProjectId]);

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", measurementId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search, measurementId]);

  return null;
};

export default GoogleAnalytics;
