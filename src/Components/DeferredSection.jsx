import React, { useEffect, useRef, useState } from "react";

const DeferredSection = ({
    children,
    fallback = null,
    rootMargin = "0px 0px 200px 0px",
    threshold = 0,
}) => {
    const containerRef = useRef(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (shouldRender) {
            return undefined;
        }

        const element = containerRef.current;

        if (!element) {
            return undefined;
        }

        if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
            setShouldRender(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [rootMargin, shouldRender, threshold]);

    return <div ref={containerRef}>{shouldRender ? children : fallback}</div>;
};

export default DeferredSection;