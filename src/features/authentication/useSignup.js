import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function () {
  const navigate = useNavigate();
  //   const queryClient = useQueryClient();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: () => {
      // console.log(queryClient.getQueryData());
      //   queryClient.setQueryData(["user"], user.user);
      // console.log(queryClient.getQueryData());
      navigate("/originals", { replace: true });
    },
    onError: (err) => {
      toast.error("Email or Password are incorrect");
      console.error(err);
    },
  });

  return { signup, isLoading };
}
