import { useEffect } from "react";
import { useLocation } from "react-router";

const GoogleAnalytics = ({ measurementId = "Measurement ID" }) => {
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
