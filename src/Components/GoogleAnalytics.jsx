import { useEffect } from "react";
import { useLocation } from "react-router";

const DEFAULT_MEASUREMENT_ID = "G-JG742N2K6Z";

const GoogleAnalytics = ({ measurementId = DEFAULT_MEASUREMENT_ID }) => {
    const location = useLocation();

    useEffect(() => {
        if (typeof window.gtag !== "undefined") {
            window.gtag("config", measurementId, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location, measurementId]);

    return null;
};

export default GoogleAnalytics;
