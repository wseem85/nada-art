import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";

import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/TextArea";
import FormRow from "../../ui/FormRow";
// import SpinnerMini from "../../ui/SpinnerMini";
// import useCreateImage from "./useCreateImage";
import useEditImage from "./useEditImge";

// import { ResponsiveFormRow } from "../../ui/ResponsiveFormRow";
import { FormButton } from "../../ui/FormButton";
import useCreateImage from "./useCreateImage";
import Heading from "../../ui/Heading";
// import { media } from "../../utils/helpers";
// import { breakpoints } from "../../utils/variables";
import styled from "styled-components";
const StyledFormTitle = styled(Heading)`
  margin-bottom: 2rem;
  color: var(--color-brand-300);
`;
function EditImageForm({ imageToEdit = {}, onCloseModal }) {
  const { id: imageId, ...editValues } = imageToEdit;
  const { src: srcString } = imageToEdit;
  const soldOutStr = imageToEdit.soldOut === true ? "true" : "false";
  const isEditSession = Boolean(imageId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? { ...editValues, soldOut: soldOutStr } : {},
  });
  const errors = formState.errors;
  const { isCreating, createImage } = useCreateImage();
  const { isEditing, editImage } = useEditImage();
  const isWorking = isEditing || isCreating;
  function onSubmit(data) {
    const { width, height } = data;

    const soldOut = data.soldOut === "true" ? true : false;
    const dimenitions = `${width}*${height}`;

    const srcType = typeof data.src === "string";
    const src = srcType || data.src?.length === 0 ? srcString : data.src[0];

    if (isEditSession) {
      editImage(
        {
          newImage: { ...data, src, dimenitions, soldOut },
          id: imageId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      createImage(
        { ...data, src, dimenitions, soldOut },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <StyledFormTitle as="h3">
        {isEditSession ? "Edit Image " : "Upload New Image"}
      </StyledFormTitle>

      <div></div>
      <FormRow
        type="editimageform"
        label="Title"
        error={errors?.title?.message}
      >
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "this feild is required",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow
        type="editimageform"
        label="Category"
        error={errors?.category?.message}
      >
        <Input
          type="text"
          id="category"
          {...register("category", {
            required: "this feild is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        type="editimageform"
        label="Price"
        error={errors?.price?.message}
      >
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "this feild is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        type="editimageform"
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this feild is required",
            validate: (value) =>
              value < 99 || "Discount is a Percentage Value of the price ",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        type="editimageform"
        label="sold Out"
        error={errors?.soldOut?.message}
      >
        <Input
          type="text"
          id="soldOut"
          defaultValue="false"
          {...register("soldOut", {
            required: "this feild is required",
            validate: (value) =>
              value !== "false" ||
              value !== "true" ||
              "You must insert one of these values (false or true)",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <div></div>

      <FormRow
        type="editimageform"
        label="Width"
        error={errors?.width?.message}
      >
        <Input
          type="number"
          id="width"
          defaultValue={0}
          {...register("width", {
            required: "this feild is required",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow
        type="editimageform"
        label="Height"
        error={errors?.height?.message}
      >
        <Input
          type="number"
          id="height"
          defaultValue={0}
          {...register("height", {
            required: "this feild is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        type="editimageform"
        label="Description"
        error={errors?.description?.message}
        style={{ gridTemplateColumns: "unset" }}
      >
        <div>
          <Textarea
            type="text"
            id="description"
            defaultValue=""
            {...register("description", {
              required: "this feild is required",
            })}
          />
        </div>
      </FormRow>

      <FormRow type="editimageform" label="photo" error={errors?.src?.message}>
        <FileInput
          id="src"
          accept="image/*"
          {...register("src", {
            required: false,
          })}
        />
      </FormRow>

      <FormRow type="editimageform">
        {/* type is an HTML attribute! */}
        <FormButton
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </FormButton>
        <FormButton disabled={isWorking}>
          {isEditSession ? "Update" : "Upload"}
        </FormButton>
      </FormRow>
    </Form>
  );
}

export default EditImageForm;
