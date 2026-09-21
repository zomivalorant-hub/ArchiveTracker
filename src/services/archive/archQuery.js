import { useQuery } from "@tanstack/react-query";
import { apiArchive } from "./apiArchive";

export function useAllArchive() {
  return useQuery({
    queryKey: ["allArchive"],
    queryFn: apiArchive,
  });
}
