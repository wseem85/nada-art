// import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
// import useDeleteImage from "../features/images/useDeleteImage";
import { media } from "../utils/helpers";
import { formatCurrency } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SimilarImages from "../features/images/SimilarImages";
import { useImage } from "../features/images/useImage";
import useUser from "../features/authentication/useUser";
import useAddToCart from "../hooks/useAddToCart";
import { useStoredCart } from "../contexts/StoredCartContext";
import Modal from "../features/images/Modal";
import useDeleteImage from "../features/images/useDeleteImage";
import EditImageForm from "../features/images/EditImageForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import ButtonIconText from "../ui/ButtonIconText";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import Spinner from "../ui/Spinner";
import {
  MdOutlineAddShoppingCart,
  MdOutlineSearch,
  MdOutlineArrowBack,
} from "react-icons/md";
import withScrollToTop from "../ui/withScroolToTop";
const ImagePageContiner = styled.div`
  /* min-height: 100vh; */
  padding: 0.7rem 1rem;
  position: relative;
  margin-bottom: 2.3rem;
  ${media(breakpoints.xs)} {
    padding: 1.3rem 2rem;
  }

  display: grid;
  justify-content: center;
  align-content: center;
  gap: 1.3rem;
  ${media(breakpoints.pmd)} {
    grid-template-columns: 1fr 1fr;
    align-content: start;
    margin-top: 1.3rem;
    min-height: unset;
    gap: 2rem;
  }
  ${media(breakpoints.md)} {
    gap: 3rem;
  }
  ${media(breakpoints.lg)} {
    gap: 4rem;
  }
`;
const ImageContainer = styled.div``;
const StyledImage = styled.img`
  object-fit: cover;
  aspect-ratio: 5/6;
  width: 100%;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  ${media(breakpoints.md)} {
    padding-top: 3.2rem;
    gap: 3.2rem;
    font-size: 110%;
  }
`;
const AvailabilityBox = styled.div`
  /* width: 6rem; */
  background-color: var(--color-brand-500);
  color: var(--color-grey-100);
  font-weight: bold;
  font-size: 80%;
  ${media("350px")} {
    font-size: 100%;
  }
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
const StyledTitle = styled(Heading)`
  font-size: 1.7rem;
  font-weight: 600;
  color: var(---color-brand-300);
  ${media("350px")} {
    font-size: 2.3rem;
  }
`;
const StyledDescription = styled.p`
  line-height: 1.2;
  text-align: left;
  letter-spacing: var(--space-md);
  margin-bottom: 1.7rem;
  /* padding-left: 0.4rem; */
  padding-right: 0.4rem;
  ${media(breakpoints.md)} {
    line-height: 1.6;
  }
  color: var(--color-grey-500);
  &::first-letter {
    font-weight: bold;

    color: var(--color-brand-300);
  }
`;
const Tag = styled.span`
  display: inline-block;
  border: 1px solid var(--color-grey-0);
  padding: 0.3rem;
  margin-left: 0.5rem;
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
  letter-spacing: 1.3px;
  font-weight: 500;
  font-size: 90%;
  ${media("350px")} {
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 100%;
  }
  text-transform: uppercase;
  /* margin-left: 1.5rem; */
  ${(props) =>
    props.hasbgc === "yes" &&
    css`
      background-color: var(--color-brand-300);
      border-radius: 8px;
      color: var(--color-grey-50);
      padding: 0.5rem;
      letter-spacing: 1.2px;
      text-transform: capitalize;
      margin-left: 0.7rem;
    `}
`;

function ImagePageComponent() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { setStoredCart } = useStoredCart();
  const isSuper = user?.user_metadata?.is_superuser;
  const { data: image, isLoading: isLoadingImage } = useImage();
  const { isDeleting, deleteImage } = useDeleteImage();
  const { handleAddToCart } = useAddToCart(image?.id);
  function handleClick() {
    handleAddToCart();
    setStoredCart(JSON.parse(localStorage.getItem("cart")));
  }
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
  if (isLoadingImage) return <Spinner />;
  return (
    <ImagePageContiner>
      <ImageContainer>
        <StyledImage src={src} />
      </ImageContainer>
      <TextContainer>
        <Row type="horizontal">
          <StyledTitle as="h3">{title}</StyledTitle>
          <AvailabilityBox avail={soldOut ? "off" : "on"}>
            {soldOut ? "Sold out" : "In store"}
          </AvailabilityBox>
        </Row>
        <Row type="vertical">
          <StyledDescription>{description}</StyledDescription>
          <Row type="horizontal" style={{ justifyContent: "flex-start" }}>
            <Label>Dimenisions:</Label>
            <Label hasbgc="yes">
              {width}&quot; &times;{height}&quot;
            </Label>
          </Row>
          <Row type="horizontal" style={{ justifyContent: "flex-start" }}>
            <Label>Category:</Label>
            <Label hasbgc="yes">{category}</Label>
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
        {!isSuper && (
          <>
            <Row style={{ alignItems: "center", gap: "2rem" }}>
              {image.soldOut && (
                <ButtonIconText style={{ width: "80%" }}>
                  <span>Search For Similars</span> <MdOutlineSearch />
                </ButtonIconText>
              )}
              {!image.soldOut && (
                <ButtonIconText onClick={handleClick} style={{ width: "80%" }}>
                  <span>Add To Cart</span> <MdOutlineAddShoppingCart />
                </ButtonIconText>
              )}
              <ButtonIconText onClick={() => navigate(-1)}>
                <span>Back</span>
                <MdOutlineArrowBack />
              </ButtonIconText>
            </Row>
            <SimilarImages image={image} />
          </>
        )}
        {isSuper && (
          <Row type="horizental" style={{ gap: "2rem" }}>
            <Modal>
              <Modal.Open opens="edit">
                <ButtonIconText>
                  <span>Edit</span>
                  <MdOutlineEditNote />
                </ButtonIconText>
              </Modal.Open>

              <Modal.Open opens="delete">
                <ButtonIconText>
                  <span>Delete</span>
                  <MdDeleteForever />
                </ButtonIconText>
              </Modal.Open>
              <ButtonIconText onClick={() => navigate(-1)}>
                <span>Back</span>
                <MdOutlineArrowBack />
              </ButtonIconText>
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
        )}
      </TextContainer>
    </ImagePageContiner>
  );
}

const ImagePage = withScrollToTop(ImagePageComponent);
export default ImagePage;
