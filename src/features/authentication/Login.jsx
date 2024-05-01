import { HiOutlineLogin } from "react-icons/hi";

import { Link } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";
import styled from "styled-components";
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
export default function Login() {
  return (
    <Link to="/account">
      <EditedButtonIcon content="Log in">
        <HiOutlineLogin />
      </EditedButtonIcon>
    </Link>
  );
}
