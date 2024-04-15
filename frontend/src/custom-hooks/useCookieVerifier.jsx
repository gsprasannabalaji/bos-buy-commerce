import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../features/user/userSlice";

const useCookieVerifier = () => {
  const user = useSelector((state) => state?.user?.user);
  const [isAdminRole, setIsAdminRole] = useState(false);
  const dispatch = useDispatch();
  const currentUserDetails = localStorage.getItem("userDetails")
    ? JSON?.parse(localStorage.getItem("userDetails"))
    : "";

  useEffect(() => {
    if (!user?.isUserValid) {
      (async () => {
        try {
          const isAdminRole = await axios?.get(
            `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/user/check-admin`,
            {
              withCredentials: true,
            }
          );
          setIsAdminRole(isAdminRole || false);
          dispatch(setUser({
            ...user,
            isUserValid: true
          }))
        } catch (error) {
          console.error("Error verifying cookie:", error);
          setIsAdminRole(false);
          dispatch(setUser({
            ...user,
            isUserValid: false
          }))
        }
      })();
    } else {
      dispatch(setUser({
        ...user,
        isUserValid: true
      }))
    }
  }, []);

  return { isAdminRole, currentUserDetails };
};

export default useCookieVerifier;
