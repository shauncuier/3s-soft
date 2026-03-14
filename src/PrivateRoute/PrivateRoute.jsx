import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, authLoading, authInitialized, ensureAuthInitialized } = useContext(AuthContext);
  const location = useLocation();

  React.useEffect(() => {
    if (!authInitialized) {
      ensureAuthInitialized().catch(() => { });
    }
  }, [authInitialized, ensureAuthInitialized]);

  if (!authInitialized || authLoading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
