import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "../../services/apiCart";
import toast from "react-hot-toast";

export default function useAddProduct() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: addProduct } = useMutation({
    mutationFn: (newProduct) => addProductToCart(newProduct),
    onSuccess: () => {
      toast("Product Successfully Added");
      queryClient.invalidateQueries({
        gueryKey: ["carts"],
      });
    },
    onError: (err) => {
      toast(err.message);
    },
  });
  return { isCreating, addProduct };
}
