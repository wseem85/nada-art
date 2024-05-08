import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductFromCart } from "../../services/apiCart";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../contexts/CurrentUserProvider";

export default function useDeleteProduct() {
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: function (id) {
      console.log(id);
      deleteProductFromCart(id);
    },
    onSuccess: () => {
      toast("Product Successfully Removed");
      queryClient.invalidateQueries({
        gueryKey: ["carts", currentUser?.id],
      });
    },
    onError: (err) => {
      toast(err.message);
    },
  });
  console.log(isDeleting);
  return { isDeleting, deleteProduct };
}
