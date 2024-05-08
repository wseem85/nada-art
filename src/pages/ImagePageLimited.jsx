import { useNavigate } from "react-router-dom";
import SimilarImages from "../features/images/SimilarImages";
import { useImage } from "../features/images/useImage";
import { MdOutlineArrowBack } from "react-icons/md";
// import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import ImagePage from "./ImagePage";
import ButtonIcon from "../ui/ButtonIcon";
import Row from "../ui/Row";
import Button from "../ui/Button";
import useUser from "../features/authentication/useUser";
import withScrollToTop from "../ui/withScroolToTop";
import useAddToCart from "../hooks/useAddToCart";
import { useStoredCart } from "../contexts/StoredCartContext";
function ImagePageLimitedComponent() {
  const { user } = useUser();
  const { setStoredCart } = useStoredCart();
  const isSuper = user?.user_metadata?.is_superuser;
  const navigate = useNavigate();
  const { data: image, isLoading: isLoadingImage } = useImage();
  const { handleAddToCart } = useAddToCart(image?.id);
  function handleClick() {
    handleAddToCart();
    setStoredCart(JSON.parse(localStorage.getItem("cart")));
  }
  if (isLoadingImage) return <Spinner />;
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <ImagePage image={image} />
      {!isSuper && (
        <>
          <Row>
            {image.soldOut && (
              <Button
                variation="primary"
                size="large"
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Search For Similars
              </Button>
            )}
            {!image.soldOut && (
              <Button
                variation="primary"
                size="large"
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={handleClick}
              >
                Add To Cart
              </Button>
            )}
          </Row>
          <SimilarImages image={image} />
        </>
      )}
      <ButtonIcon onClick={() => navigate(-1)}>
        <span>Back</span>
        <MdOutlineArrowBack />
      </ButtonIcon>
    </div>
  );
}
const ImagePageLimited = withScrollToTop(ImagePageLimitedComponent);
export default ImagePageLimited;
