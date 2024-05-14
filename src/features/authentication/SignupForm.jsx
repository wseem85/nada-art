import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowRegular from "../../ui/FormRowRegular";
import SpinnerMini from "../../ui/SpinnerMini";
import useSignup from "./useSignup";
import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { useCurrentUser } from "../../contexts/CurrentUserProvider";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// const EditedInput = styled(Input)`
//   width: 100%;
// `;
function SignupForm() {
  //   const { setCurrentUser } = useCurrentUser();
  const { register, handleSubmit, getValues, formState } = useForm();
  const errors = formState.errors;

  console.log(errors);
  const { signup, isLoading: isSigningup } = useSignup();
  console.log(isSigningup);
  const navigate = useNavigate();
  function onSubmit(data) {
    const { email, password, fullName } = data;
    if (!email || !password || !fullName) return;
    signup(
      { email, password, fullName },
      {
        onSettled: () => {
          navigate("/login");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowRegular label="Full Name" error={errors?.fullName?.message}>
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
      </FormRowRegular>
      <FormRowRegular label="Email address" error={errors?.email?.message}>
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
      </FormRowRegular>
      <FormRowRegular label="Password" error={errors?.password?.message}>
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
      </FormRowRegular>

      <FormRowRegular
        label="Confirm Password"
        error={errors?.confirmedPassword?.message}
      >
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
      </FormRowRegular>
      <FormRowRegular>
        <Button size="large">
          {/* <SpinnerMini /> */}
          {!isSigningup ? "Signup" : <SpinnerMini />}
        </Button>
      </FormRowRegular>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.3rem",
        }}
      >
        Already have an account ?
        <Link to="/login">
          <span
            style={{
              color: "var(--color-brand-300)",
              textDecoration: "underline",
              display: "inline-block",
              marginLeft: "1rem",
            }}
          >
            Log in
          </span>
        </Link>
      </div>
    </Form>
  );
}

export default SignupForm;
