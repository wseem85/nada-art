import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import { StyledLogo } from "../ui/Logo";

import Heading from "../ui/Heading";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import withScrollToTop from "../ui/withScroolToTop";
const LoginLayout = styled.main`
  padding: 1.3rem 1.7rem;
  margin-top: 2.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;
  background-color: var(--color-grey-50);
  & > form {
    width: 100%;
  }
  & > h3 {
    text-transform: uppercase;
  }
  ${media(breakpoints.xs)} {
    & > form {
      max-width: 50rem;
    }
  }
`;

function LoginComponent() {
  return (
    <LoginLayout>
      <StyledLogo>Nada art</StyledLogo>
      <Heading as="h3">Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}
const Login = withScrollToTop(LoginComponent);
export default Login;
