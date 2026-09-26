import { useQuery } from "@tanstack/react-query";
import { apiAllUsers } from "./apiAuth";

export function useAllUsers() {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: apiAllUsers,
  });
}
