import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRowRegular from "../../ui/FormRowRegular";
import Input from "../../ui/Input";

import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";
const StyledFormTitle = styled(Heading)`
  margin-bottom: 2rem;

  color: var(--color-brand-300);
`;

function UpdateUserDataForm({ onCloseModal }) {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(avatar);
          e.target.reset();

          onCloseModal?.();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <StyledFormTitle>Update User Info</StyledFormTitle>
      <FormRowRegular label="Email address">
        <Input value={email} disabled />
      </FormRowRegular>

      <FormRowRegular label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRowRegular>

      <FormRowRegular label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRowRegular>

      <FormRowRegular>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Reset
        </Button>
        <Button disabled={isUpdating} style={{ minWidth: "14rem" }}>
          {!isUpdating ? "Update Info" : <SpinnerMini />}
        </Button>
      </FormRowRegular>
    </Form>
  );
}

export default UpdateUserDataForm;
