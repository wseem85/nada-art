import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowRegular from "../../ui/FormRowRegular";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";
const StyledFormTitle = styled(Heading)`
  margin-bottom: 2rem;
  font-size: 90%;
  color: var(--color-brand-300);
`;
function UpdatePasswordForm({ onCloseModal }) {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormTitle>Update Your Pasdword</StyledFormTitle>
      <div></div>
      <FormRowRegular
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowRegular>

      <FormRowRegular
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRowRegular>
      <FormRowRegular>
        <Button onClick={reset} type="reset" variation="secondary">
          Reset
        </Button>
        <Button disabled={isUpdating} style={{ minWidth: "16rem" }}>
          {isUpdating ? <SpinnerMini /> : "Update password"}
        </Button>
      </FormRowRegular>
    </Form>
  );
}

export default UpdatePasswordForm;
