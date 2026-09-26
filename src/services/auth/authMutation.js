import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiAddUser, apiLogin, delUser, updateAUser } from "./apiAuth";
import { message } from "antd";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateLogin, isLoadingLogin } = useMutation({
    mutationFn: async (userForm) => apiLogin(userForm),
    onSuccess: (user) => {
      if (!user) {
        message.error("Invalid username or password");
        return;
      }
      queryClient.setQueryData(["userInfo"], user);
      message.success("Authentication successfully!");
      if (user) {
        navigate("/", { replace: true });
      }
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { mutateLogin, isLoadingLogin };
}

export function useDelUser() {
  return useMutation({
    mutationFn: delUser,
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: (data) => {
      return updateAUser(data);
    },
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: apiAddUser,
  });
}
