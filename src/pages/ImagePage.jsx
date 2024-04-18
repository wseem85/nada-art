// import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useImage } from "../features/images/useImage";
import useDeleteImage from "../features/images/useDeleteImage";
import { media } from "../utils/helpers";
import { formatCurrency } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Paragraph from "../ui/Pharagraph";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
// import supabase from "../services/supabase"; // Initialize Supabase client
import useUser from "../features/authentication/useUser";
import Modal from "../features/images/EditPictureModal";
import ConfirmDelete from "../ui/ConfirmDelete";
import EditImageForm from "../features/images/EditImageForm";
import { useNavigate } from "react-router-dom";

const ImagePageContiner = styled.div`
  min-height: 100vh;
  padding: 0 3rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  background-color: var(--color-grey-100);
  display: grid;
  justify-content: center;
  align-content: center;
  gap: 3rem;
  ${media(breakpoints.sm)} {
    grid-template-columns: 1fr 1fr;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  ${media(breakpoints.sm)} {
    margin-bottom: 0;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const AvailabilityBox = styled.div`
  width: 10rem;
  background-color: var(--color-brand-500);
  color: var(--color-grey-100);
  font-weight: bold;
  font-size: var(--font-md);
  text-align: center;
  padding: 0.3rem;
  border-radius: 1rem;
  ${(props) =>
    props.avail === "on" &&
    css`
      background-color: var(--color-green-700);
    `}
  ${(props) =>
    props.avail === "off" &&
    css`
      background-color: var(--color-red-700);
    `}
`;
const Tag = styled.span`
  display: inline-block;
  border: 1px solid var(--color-grey-0);
  padding: 0.3rem;

  background-color: var(--color-grey-100);

  ${(props) =>
    props.type === "sold" &&
    css`
      background-color: var(--color-green-700);
      /* font-weight: bold; */
      margin-left: 1.2rem;
      display: flex;
      word-wrap: break-word;
      justify-content: center;
      align-items: center;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      color: var(--color-grey-100);
    `}
`;
const Label = styled.p`
  /* width: 12rem; */
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: bold;
  margin-left: 1.5rem;
  ${(props) =>
    props.hasBgc === "yes" &&
    css`
      background-color: var(--color-brand-300);
      border-radius: 8px;
      color: var(--color-grey-50);
      padding: 0.5rem;
      letter-spacing: 2px;
      text-transform: capitalize;
    `}
`;
export default function ImagePage() {
  const { data: image, isLoading: isLoadingImage } = useImage();
  const { isLoading: isLoadingUser } = useUser();
  const navigate = useNavigate();
  const { isDeleting, deleteImage } = useDeleteImage();
  // const isSuperUser = user?.user_metadata.is_superuser;

  const {
    id,
    title,
    description,
    price,
    width,
    soldOut,
    height,
    discount,
    src,
    category,
  } = image || {};
  if (isLoadingImage || isLoadingUser) return <Spinner />;
  // const inputImgObj = {
  //   ...image,
  //   soldOut: image.soldOut === true ? "true" : "false",
  // };
  // console.log(user);
  return (
    <>
      <ImagePageContiner>
        <ImageContainer>
          <img src={src} style={{ width: "100%" }} />
        </ImageContainer>
        <TextContainer>
          <Row type="horizontal">
            <Heading as="h2" style={{ color: "var(--color-brand-500)" }}>
              {title}
            </Heading>
            <AvailabilityBox avail={soldOut ? "off" : "on"}>
              {soldOut ? "Sold out" : "In store"}
            </AvailabilityBox>
          </Row>
          <Row type="vertical">
            <Paragraph>{description}</Paragraph>
            <Row type="horizontal" style={{ justifyContent: "flex-start" }}>
              <Label>Dimenisions:</Label>
              <Label hasBgc="yes">
                {width}&quot; &times;{height}&quot;
              </Label>
            </Row>
            <Row type="horizontal" style={{ justifyContent: "flex-start" }}>
              <Label>Category:</Label>
              <Label hasBgc="yes">{category}</Label>
            </Row>
          </Row>
          {discount !== 0 ? (
            <Row
              type="horizontal"
              style={{
                justifyContent: "flex-start",
                gap: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Label>Old Price</Label>
                <Tag style={{ textDecoration: "line-through" }}>{price}</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Label>New Price</Label>
                <Tag
                  style={{
                    fontWeight: "bold",
                    color: "var(--color-green-700)",
                  }}
                >
                  {formatCurrency(Math.floor(price - (price * discount) / 100))}
                </Tag>
              </div>
            </Row>
          ) : (
            <Row type="horizontal" style={{ justifyContent: "flex-start" }}>
              <Label>Price :</Label>
              <Tag>{formatCurrency(price)}</Tag>
            </Row>
          )}
          <Row>
            <Button
              variation="primary"
              size="large"
              style={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {soldOut ? "Search For Similars" : "Add To Cart"}
            </Button>
          </Row>
          <Row type="horizontal" style={{ justifyContent: "space-between" }}>
            <Modal>
              <Modal.Open opens="edit">
                <Button variation="secondary" size="medium">
                  Edit Picture
                </Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Button variation="danger" size="medium">
                  Delete Picture
                </Button>
              </Modal.Open>

              <Modal.Window name="edit">
                <EditImageForm imageToEdit={image} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  onConfirm={() => {
                    deleteImage(id);
                    navigate(-1);
                  }}
                  disabled={isDeleting}
                  resourseName="Picture"
                />
              </Modal.Window>
            </Modal>
          </Row>
        </TextContainer>
      </ImagePageContiner>
    </>
  );
}
