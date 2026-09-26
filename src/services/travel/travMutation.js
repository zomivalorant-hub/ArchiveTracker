import { useMutation } from "@tanstack/react-query";
import { addATravel, delTravel, updateTravel } from "./apiTravel";

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

export function useUpdateTravel() {
  return useMutation({
    mutationFn: (data) => {
      return updateTravel(data);
    },
  });
}
