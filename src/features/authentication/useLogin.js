import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // console.log(queryClient.getQueryData());
      queryClient.setQueryData(["user"], user.user);
      // console.log(queryClient.getQueryData());
      navigate("/originals", { replace: true });
    },
    onError: (err) => {
      toast.error("Email or Password are incorrect");
      console.error(err);
    },
  });
  return { login, isLoading };
}
