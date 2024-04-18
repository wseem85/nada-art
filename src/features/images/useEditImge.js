import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editImage as editImageApi } from "../../services/apiImages";
import toast from "react-hot-toast";

export default function useEditImage() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editImage } = useMutation({
    mutationFn: ({ newImage, id }) => editImageApi(newImage, id),
    onSuccess: () => {
      toast.success("Image Successfully Edited");
      queryClient.invalidateQueries({
        gueryKey: ["image", "allImages", "images"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editImage };
}
