import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const currentPathname = location?.pathname + location?.search;
// useEffect hook to perform side effects when the location changes
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, [currentPathname]);
// Return null because this component doesn't render anything in the DOM
  return null;
}