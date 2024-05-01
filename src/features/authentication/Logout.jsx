import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";
// import { useCurrentUser } from "../../contexts/CurrentUserProvider";
const EditedButtonIcon = styled(ButtonIcon)`
  background-color: transparent;
  & svg {
    color: var(--color-brand-700);
  }
  &:hover {
    background-color: transparent;
  }
  &:hover svg {
    color: var(--color-brand-500);
  }
`;
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
    <EditedButtonIcon onClick={handleClick} content="Log out">
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </EditedButtonIcon>
  );
}
