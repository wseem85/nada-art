import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/TextArea";
import FormRow from "../../ui/FormRow";
// import SpinnerMini from "../../ui/SpinnerMini";
// import useCreateImage from "./useCreateImage";
import useEditImage from "./useEditImge";
import Row from "../../ui/Row";
import { media } from "../../utils/helpers";
import { breakpoints } from "../../utils/variables";
import styled from "styled-components";
const ResponsiveFormRow = styled(Row)`
  flex-direction: column;
  margin-bottom: 2rem;
  ${media(breakpoints.sm)} {
    flex-direction: row;
  }
`;
const FormButton = styled(Button)`
  &:disabled {
    background-color: var(--color-brand-100);
    opacity: 0.7;
  }
`;
function EditImageForm({ imageToEdit = {}, onCloseModal }) {
  const { id: imageId, ...editValues } = imageToEdit;
  const { src: srcString } = imageToEdit;
  const soldOutStr = imageToEdit.soldOut === true ? "true" : "false";
  // const isEditSession = Boolean(imageId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { ...editValues, soldOut: soldOutStr },
  });
  const errors = formState.errors;
  // const { isCreating, createCabin } = useCreateImage();
  const { isEditing, editImage } = useEditImage();
  const isWorking = isEditing;
  function onSubmit(data) {
    console.log(data);
    const { width, height } = data;

    const soldOut = data.soldOut === "true" ? true : false;
    const dimenitions = `${width}*${height}`;
    console.log(dimenitions);
    console.log(data.src);
    const srcType = typeof data.src === "string";
    const src = srcType || data.src?.length === 0 ? srcString : data.src[0];
    // const price = Math.floor(
    //   Number(data.price) - (Number(data.price) * data.discount) / 100
    // );

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
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <ResponsiveFormRow>
        <FormRow label="Image Title" error={errors?.title?.message}>
          <Input
            type="text"
            id="title"
            {...register("title", {
              required: "this feild is required",
            })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Image Category" error={errors?.category?.message}>
          <Input
            type="text"
            id="category"
            {...register("category", {
              required: "this feild is required",
            })}
            disabled={isWorking}
          />
        </FormRow>
      </ResponsiveFormRow>
      <ResponsiveFormRow>
        <FormRow label="Price" error={errors?.price?.message}>
          <Input
            type="number"
            id="price"
            {...register("price", {
              required: "this feild is required",
            })}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
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
      </ResponsiveFormRow>
      <ResponsiveFormRow>
        <FormRow label="sold Out" error={errors?.soldOut?.message}>
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
      </ResponsiveFormRow>
      <ResponsiveFormRow>
        <FormRow label="Image Width" error={errors?.width?.message}>
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
        <FormRow label="Image Height" error={errors?.height?.message}>
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
      </ResponsiveFormRow>

      <FormRow
        label="Description"
        error={errors?.description?.message}
        style={{ gridTemplateColumns: "1fr" }}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this feild is required",
          })}
        />
      </FormRow>

      <FormRow label="Image photo" error={errors?.src?.message}>
        <FileInput
          id="src"
          accept="image/*"
          {...register("src", {
            required: false,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <FormButton
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </FormButton>
        <FormButton disabled={isWorking}>Edit Image</FormButton>
      </FormRow>
    </Form>
  );
}

export default EditImageForm;
