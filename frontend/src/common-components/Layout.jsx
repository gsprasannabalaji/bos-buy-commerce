import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useCookieVerifier from "../custom-hooks/useCookieVerifier";
import AdminHeader from "./AdminHeader";
import Header from "./Header";

const Layout = ({ children }) => {
  const { isUserValid, role } = useSelector((state) => state?.user?.user);
  const { isCookieLoading } = useCookieVerifier();
  const isAdminRole = role === "admin";
  const location = useLocation();
  const currentPathname = location.pathname;
  const adminRoutes = ["/admin", "/addProducts"];
  const customerRoutes = [
    "/",
    "/searchResults",
    "/cart",
    "/products",
    "/products/category",
    "/orders",
  ];

  if(isCookieLoading) {
    return "";
  }

  if (isUserValid && currentPathname === "/login") {
    if (isAdminRole) {
      return <Navigate to="/admin" replace />
    } else { 
      return <Navigate to="/" replace />
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
      return <Navigate to="/admin" replace />
    }
  } else {
    if (customerRoutes?.includes(currentPathname)) {
      return (
        <>
          <Header />
          <div>{children}</div>
        </>
      );
    } else {
      return <Navigate to="/" replace />
    }
  }
};

export default Layout;
