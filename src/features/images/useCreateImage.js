import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editImage } from "../../services/apiImages";
import toast from "react-hot-toast";

export default function useCreateImage() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createImage } = useMutation({
    mutationFn: (newImage) => editImage(newImage),
    onSuccess: () => {
      toast("Image Successfully Added");
      queryClient.invalidateQueries({
        gueryKey: ["images"],
      });
    },
    onError: (err) => {
      toast(err.message);
    },
  });
  return { isCreating, createImage };
}
