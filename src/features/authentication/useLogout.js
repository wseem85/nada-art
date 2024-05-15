import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../contexts/CurrentUserProvider";
import { useAppNav } from "../../contexts/AppNavContext";
export default function useLogout() {
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setCollapsed } = useAppNav();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      setCurrentUser(null);
      if (window.innerWidth < 768) setCollapsed(true);
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout, isLoading };
}
