import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
// import { useCurrentUser } from "../../contexts/CurrentUserProvider";
export default function Logout() {
  const { logout, isLoading } = useLogout();
  // const { setCurrentUser } = useCurrentUser();
  function handleClick(e) {
    e.preventDefault();

    logout({
      onSettled: () => {
        // setCurrentUser(null);
      },
    });
    // setCurrentUser(null);
  }
  return (
    <ButtonIcon onClick={handleClick} content="Log out">
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
