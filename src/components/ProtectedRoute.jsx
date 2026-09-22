import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const queryClient = useQueryClient();
  const validUser = queryClient.getQueriesData({ queryKey: ["userInfo"] });
  if (!validUser || validUser === null) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
