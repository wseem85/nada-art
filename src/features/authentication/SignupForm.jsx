import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import useSignup from "./useSignup";
import { Link, useNavigate } from "react-router-dom";
// import { useCurrentUser } from "../../contexts/CurrentUserProvider";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";

function SignupForm() {
  //   const { setCurrentUser } = useCurrentUser();
  const { register, handleSubmit, getValues, formState } = useForm();
  const errors = formState.errors;

  console.log(errors);
  const { signup, isLoading: isSigningup } = useSignup();
  const navigate = useNavigate();
  function onSubmit(data) {
    const { email, password, fullName } = data;
    if (!email || !password || !fullName) return;
    signup(
      { email, password, fullName },
      {
        onSettled: () => {
          navigate("/account/login");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isSigningup}
          {...register("fullName", {
            required: "this feild is required",
          })}
        />
        {/* {errors.fullName && <p>{errors.fullName.message}</p>} */}
      </FormRowVertical>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isSigningup}
          {...register("email", {
            required: "this feild is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isSigningup}
          {...register("password", {
            required: "this feild is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </FormRowVertical>

      <FormRowVertical label="Confirm Password">
        <Input
          type="password"
          id="confirmedPassword"
          autoComplete="confirmed-password"
          disabled={isSigningup}
          {...register("confirmedPassword", {
            required: "this feild is required",
            validate: (value) =>
              getValues().password === value || "Passwords do not match",
          })}
        />
        {errors.confirmedPassword && <p>{errors.confirmedPassword.message}</p>}
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isSigningup}>
          {!isSigningup ? "Signup" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.3rem",
        }}
      >
        Already have an account ?
        <Link to="/account/login">
          <span
            style={{
              color: "var(--color-brand-300)",
              textDecoration: "underline",
              display: "inline-block",
              marginLeft: "1rem",
            }}
          >
            Sign in
          </span>
        </Link>
      </div>
    </Form>
  );
}

export default SignupForm;
