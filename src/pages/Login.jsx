import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import { StyledLogo } from "../ui/Logo";

import Heading from "../ui/Heading";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
const LoginLayout = styled.main`
  padding: 1.3rem 1.7rem;
  margin-top: 2.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  & > form {
    width: 100%;
  }
  ${media(breakpoints.xs)} {
    & > form {
      max-width: 50rem;
    }
  }
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
