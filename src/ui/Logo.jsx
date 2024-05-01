import styled from "styled-components";
import Row from "./Row";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import useUser from "../features/authentication/useUser";
import { useEffect } from "react";
import SpinnerMini from "./SpinnerMini";
import UserInfo from "../features/users/UserInfo";
import Login from "../features/authentication/Login";

export const StyledLogo = styled.h3`
  font-size: var(--font-lg);
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
`;
export default function Logo() {
  const { user, isAuthenticated, isLoading: isLoadingUser } = useUser();
  const { currentUser, setCurrentUser } = useCurrentUser();

  useEffect(
    function () {
      setCurrentUser(user);
    },
    [user, setCurrentUser]
  );

  return (
    <Row type="horizontal" style={{ gap: "1.6rem" }}>
      <StyledLogo>Nada Art</StyledLogo>
      {isLoadingUser && <SpinnerMini />}
      {currentUser && isAuthenticated ? <UserInfo user={user} /> : <Login />}
    </Row>
  );
}
