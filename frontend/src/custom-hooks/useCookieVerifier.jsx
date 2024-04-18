import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../features/user/userSlice";

/**
 * useCookieVerifier is a custom hook to verify user authentication status and role.
 * 
 * @returns {Object} - Returns an object containing isAdminRole, isCookieLoading, and currentUserDetails.
 */
const useCookieVerifier = () => {
  const user = useSelector((state) => state?.user?.user);
  const [isAdminRole, setIsAdminRole] = useState(false);
  const [isCookieLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentUserDetails = localStorage.getItem("userDetails")
    ? JSON?.parse(localStorage.getItem("userDetails"))
    : "";

  useEffect(() => {
    (async () => {
      try {
        const isAdminRole = await axios?.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/user/check-admin`,
          {
            withCredentials: true,
          }
        );
        setIsAdminRole(isAdminRole?.data?.isAdmin || false);
        dispatch(
          setUser({
            ...user,
            role: isAdminRole?.data?.isAdmin ? "admin" : "customer",
            isUserValid: true,
          })
        );
        setIsLoading(false);
      } catch (error) {
        setIsAdminRole(false);
        dispatch(
          setUser({
            ...user,
          })
        );
        setIsLoading(false);
      }
    })();
  }, []);

  return { isAdminRole, isCookieLoading, currentUserDetails };
};

export default useCookieVerifier;
