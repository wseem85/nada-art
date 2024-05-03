import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage as deleteImageApi } from "../../services/apiImages";
import toast from "react-hot-toast";

export default function useDeleteImage() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteImage } = useMutation({
    mutationFn: (id) => deleteImageApi(id),
    onSuccess: () => {
      toast.success("Image Successfully Deleted");
      queryClient.invalidateQueries({
        gueryKey: ["image", "allImages", "images"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteImage };
}
