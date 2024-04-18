import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useCookieVerifier from "../custom-hooks/useCookieVerifier";
import AdminHeader from "./AdminHeader";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout component handles the layout structure based on user authentication status and role.
 * It acts as protected layout which will restrict the user from different routes based on role.
 * It renders different headers and footers based on the user's role (admin or customer).
 * 
 * @param {Object} children - The child components to be rendered within the layout.
 * @returns {JSX.Element|string} - Returns the JSX element representing the layout structure.
 */

const Layout = ({ children }) => {
  const { isUserValid, role } = useSelector((state) => state?.user?.user);
  const { isCookieLoading } = useCookieVerifier();
  const isAdminRole = role === "admin";
  const location = useLocation();
  const currentPathname = location.pathname + location.search;
  const adminRoutes = ["/admin", "/addproducts", "/allorders", "/login"];
  const customerRoutes = [
    "/",
    "/cart",
    "/products",
    "/products/category",
    "/orders",
    "/orders?payment=done",
  ];

  const pattern = /^\/(products\/\w+|searchResults\?(category|q)=.+)$/;

  // Function to check if pathname matches product-related pattern
  const matchesProductPattern = (pathname) => {
    return pattern?.test(pathname);
  };

  if (isCookieLoading) {
    return "";
  }

  if (isUserValid && currentPathname === "/login") {
    if (isAdminRole) {
      return <Navigate to="/login" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  } else if (!isUserValid && currentPathname === "/login") {
    return <div>{children}</div>;
  }

  if (isAdminRole) {
    if (adminRoutes?.includes(currentPathname)) {
      return (
        <>
          {isAdminRole ? <AdminHeader /> : <Header />}
          <div>{children}</div>
        </>
      );
    } else {
      return <Navigate to="/admin" replace />;
    }
  } else {
    if (
      customerRoutes?.includes(currentPathname) ||
      matchesProductPattern(currentPathname)
    ) {
      return (
        <>
          <Header />
          <div>{children}</div>
          <Footer />
        </>
      );
    } else {
      return <Navigate to="/" replace />;
    }
  }
};

export default Layout;
