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
export default function ImagePageLimited() {
  const navigate = useNavigate();
  const { data: image, isLoading: isLoadingImage } = useImage();
  if (isLoadingImage) return <Spinner />;
  return (
    <>
      <ImagePage image={image} />
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
          {image.soldOut ? "Search For Similars" : "Add To Cart"}
        </Button>
      </Row>
      <SimilarImages image={image} />
      <ButtonIcon onClick={() => navigate(-1)}>
        <span>Back</span>
        <MdOutlineArrowBack />
      </ButtonIcon>
    </>
  );
}
