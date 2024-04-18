import { useQuery } from "@tanstack/react-query";
import { getAllImages } from "../../services/apiImages";

export function useAllImages() {
  const {
    isLoading,
    data: allImages,
    error,
  } = useQuery({
    queryKey: ["allImages"],
    queryFn: () => getAllImages(),
  });

  return { isLoading, error, allImages };
}
