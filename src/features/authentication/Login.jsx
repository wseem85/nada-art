import { HiOutlineLogin } from "react-icons/hi";

import { Link } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";

export default function Login() {
  return (
    <Link to="/login">
      <ButtonIcon content="Log in">
        <HiOutlineLogin />
      </ButtonIcon>
    </Link>
  );
}
