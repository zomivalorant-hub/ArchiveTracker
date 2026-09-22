import { useMutation } from "@tanstack/react-query";
import { addATravel, delTravel } from "./apiTravel";

export function useDelTravel() {
  return useMutation({
    mutationFn: delTravel,
  });
}

export function useCreateTravel() {
  return useMutation({
    mutationFn: addATravel,
  });
}
