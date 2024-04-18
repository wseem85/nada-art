import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../contexts/CurrentUserProvider";
export default function useLogout() {
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      setCurrentUser(null);
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout, isLoading };
}
