import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../services/apiImages";
import { useSearchParams } from "react-router-dom";

export function useImages() {
  const [searchParams] = useSearchParams();
  const filters = {};
  for (const [key, value] of searchParams) filters[key] = value;
  // const { categories, availabilities, sizes, maxPrie } = filters;

  const {
    isLoading,
    data: images,
    error,
  } = useQuery({
    queryKey: ["images", filters],
    queryFn: () => getImages(filters),
  });

  return { isLoading, error, images };
}
