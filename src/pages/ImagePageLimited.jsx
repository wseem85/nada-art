import { useNavigate } from "react-router-dom";
import SimilarImages from "../features/images/SimilarImages";
import { useImage } from "../features/images/useImage";

import {
  MdOutlineAddShoppingCart,
  MdOutlineSearch,
  MdOutlineArrowBack,
} from "react-icons/md";
// import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import ImagePage from "./ImagePage";
// import ButtonIcon from "../ui/ButtonIcon";
import Row from "../ui/Row";
// import Button from "../ui/Button";
import useUser from "../features/authentication/useUser";
import withScrollToTop from "../ui/withScroolToTop";
import useAddToCart from "../hooks/useAddToCart";
import { useStoredCart } from "../contexts/StoredCartContext";
import ButtonIconText from "../ui/ButtonIconText";
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
          <Row style={{ alignItems: "center" }}>
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
          </Row>
          <SimilarImages image={image} />
        </>
      )}
      <Row style={{ alignItems: "center", marginTop: "2.3rem" }}>
        <ButtonIconText onClick={() => navigate(-1)}>
          <span>Go Back</span>
          <MdOutlineArrowBack />
        </ButtonIconText>
      </Row>
    </div>
  );
}
const ImagePageLimited = withScrollToTop(ImagePageLimitedComponent);
export default ImagePageLimited;
