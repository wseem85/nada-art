import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "../../services/apiCart";

export function useUserCart(id) {
  const {
    isLoading,
    data: carts,
    error,
  } = useQuery({
    queryKey: ["carts", id],
    queryFn: () => getUserCart(id),
  });

  return { isLoading, error, carts };
}
