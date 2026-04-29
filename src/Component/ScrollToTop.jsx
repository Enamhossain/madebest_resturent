import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top on route change for best UX
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
