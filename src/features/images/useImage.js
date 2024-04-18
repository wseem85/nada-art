import { useQuery } from "@tanstack/react-query";
import { getImage } from "../../services/apiImages";
import { useParams } from "react-router-dom";

export function useImage() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["image", id],
    queryFn: () => getImage(id),
  });

  return { isLoading, error, data };
}
