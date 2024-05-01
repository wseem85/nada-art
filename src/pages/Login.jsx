import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import { StyledLogo } from "../ui/Logo";

import Heading from "../ui/Heading";
const LoginLayout = styled.main`
  margin-top: 2.3rem;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <StyledLogo>Nada art</StyledLogo>
      <Heading as="h4">Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
