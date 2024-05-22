import React, { createContext, useEffect } from "react";
import { getCookies } from "@/utils/cookies";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";


import { RootState } from "@/service/store/store";
import { TOKEN_COOKIE, USER_COOKIE } from "@/service/store/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const UserContext = createContext(getCookies(USER_COOKIE) || null);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookies(TOKEN_COOKIE);
    const userCookie = getCookies(USER_COOKIE);

    if (!token && !userCookie) {
      navigate("/login?error=User or password incorrects, try again!.");
    }
  }, [auth, navigate]);

  const userCookie = getCookies(USER_COOKIE);

  return (
    <UserContext.Provider value={userCookie}>
      {children}
    </UserContext.Provider>
  );
}

export default ProtectedRoute;