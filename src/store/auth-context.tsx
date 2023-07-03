import { createContext, useState, useCallback, useEffect } from "react";
import React, { ReactNode } from "react";

type AuthContextObjject = {
  isLoggedIn: boolean;
  token: string;
  setToken: (token: string, expirationTime: string) => void;
  removeToken: () => void;
};

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  setToken: (token: string, expirationTime: string) => {},
  removeToken: () => {},
});

let logoutTimer: number;
const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate!);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider: React.FC<{
  children?: ReactNode | undefined;
}> = (props) => {
  const tokenInfo = retrieveStoredToken();
  let initaltoken;
  if (tokenInfo) {
    initaltoken = tokenInfo.token;
  }
  const [token, setToken] = useState(initaltoken);
  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, expirationTime: string) => {
    console.log("called", token, expirationTime);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenInfo) {
      console.log(tokenInfo.duration);
      logoutTimer = setTimeout(logoutHandler, tokenInfo.duration);
    }
  }, [tokenInfo, logoutHandler]);
  const contextData: AuthContextObjject = {
    isLoggedIn: isLoggedIn,
    token: token!,
    setToken: loginHandler,
    removeToken: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
};
