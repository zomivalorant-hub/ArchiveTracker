import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const queryClient = useQueryClient();
  const validUser = queryClient.getQueryData(["userInfo"]);

  if (!validUser) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
