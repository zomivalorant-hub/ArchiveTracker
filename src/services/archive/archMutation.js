import { useMutation } from "@tanstack/react-query";
import { addArchive, delArchive, updateArchive } from "./apiArchive";

export function useDelArchive() {
  return useMutation({
    mutationFn: delArchive,
  });
}

export function useCreateArchive() {
  return useMutation({
    mutationFn: addArchive,
  });
}

export function useUpdateArchive() {
  return useMutation({
    mutationFn: (data) => {
      return updateArchive(data);
    },
  });
}
