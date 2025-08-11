import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" />
    );
  }

  return children;  
};

export default PrivateRoute;