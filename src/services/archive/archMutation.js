import { useMutation } from "@tanstack/react-query";
import { addArchive, delArchive } from "./apiArchive";

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
