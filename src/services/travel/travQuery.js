import { useQuery } from "@tanstack/react-query";
import { apiTravel } from "./apiTravel";

export function useAllTravel() {
  return useQuery({
    queryKey: ["allTravel"],
    queryFn: apiTravel,
  });
}
