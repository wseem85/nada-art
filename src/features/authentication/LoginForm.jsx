import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowRegular from "../../ui/FormRowRegular";
// import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogin from "./useLogin";
import { useCurrentUser } from "../../contexts/CurrentUserProvider";
import { Link } from "react-router-dom";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";

function LoginForm() {
  const { setCurrentUser } = useCurrentUser();
  const [email, setEmail] = useState("engwseem4@gmail.com");
  const [password, setPassword] = useState("qwerty1234");
  const { login, isLoading: isLoggingIn } = useLogin();
  // console.log(isLoggingIn);
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: (data) => {
          setEmail("");
          setPassword("");
          setCurrentUser(data);
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowRegular label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowRegular>
      <FormRowRegular label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowRegular>
      <FormRowRegular>
        <Button
          size="large"
          disabled={isLoggingIn}
          style={{ minWidth: "10rem" }}
        >
          {!isLoggingIn ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowRegular>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.3rem",
        }}
      >
        Dont have an account ?
        <Link to="/signup">
          <span
            style={{
              color: "var(--color-brand-300)",
              textDecoration: "underline",
              display: "inline-block",
              marginLeft: "1rem",
            }}
          >
            Create One
          </span>
        </Link>
      </div>
    </Form>
  );
}

export default LoginForm;
