import { useNavigate } from "react-router-dom";
// import SimilarImages from "../features/images/SimilarImages";
import { useImage } from "../features/images/useImage";
// import ButtonIcon from "../ui/ButtonIcon";
// import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import ImagePage from "./ImagePage";
import Row from "../ui/Row";
import Modal from "../features/images/Modal";
import useDeleteImage from "../features/images/useDeleteImage";
import EditImageForm from "../features/images/EditImageForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import { MdOutlineArrowBack } from "react-icons/md";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import withScrollToTop from "../ui/withScroolToTop";
import ButtonIconText from "../ui/ButtonIconText";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.3rem 0.5rem;
  ${media("350px")} {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
  ${media(breakpoints.xs)} {
    padding-left: 1.3rem;
    padding-right: 1.3rem;
    margin-bottom: 5rem;
    /* margin-bottom: 0; */
  }
  ${media(breakpoints.sm)} {
    padding-left: 2.3rem;
    padding-right: 2.3rem;
  }
  /* margin-top: 3rem; */
  margin-bottom: 3rem;
  /* position: relative; */
`;
// const EditedButtonIconText = styled(ButtonIconText)`
//   background-color: var(--color-brand-smallTransparency);
//   color: #fff;
//   border-radius: 0;
// `;
// const AbsoluteRow = styled(Row)`
//   gap: 1rem;
//   justify-content: center;
//   /* width: 100%; */
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
//   bottom: 5%;
//   ${media("350px")} {
//     bottom: 2%;
//   }
//   ${media("430px")} {
//     bottom: -1%;
//   }
//   ${media("430px")} {
//     bottom: -3%;
//   }
//   ${media(breakpoints.pmd)} {
//     left: unset;
//     width: 50%;
//     transform: none;
//     right: 0;
//     bottom: 27%;
//   }
//   z-index: 10;
// `;
function ImagePageLimitedComponent() {
  const navigate = useNavigate();
  const { data: image, isLoading: isLoadingImage } = useImage();
  const { isDeleting, deleteImage } = useDeleteImage();
  if (isLoadingImage || isDeleting) return <Spinner />;
  const { id } = image;
  return (
    <Container>
      <ImagePage image={image}></ImagePage>
      <Row type="horizental">
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
    </Container>
  );
}

const ImagePageLimited = withScrollToTop(ImagePageLimitedComponent);
export default ImagePageLimited;
