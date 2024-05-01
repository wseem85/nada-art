import { useNavigate } from "react-router-dom";
// import SimilarImages from "../features/images/SimilarImages";
import { useImage } from "../features/images/useImage";
import ButtonIcon from "../ui/ButtonIcon";
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 0 3rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
export default function ImagePageLimited() {
  const navigate = useNavigate();
  const { data: image, isLoading: isLoadingImage } = useImage();
  const { isDeleting, deleteImage } = useDeleteImage();
  if (isLoadingImage || isDeleting) return <Spinner />;
  const { id } = image;
  return (
    <Container>
      <Row type="horizontal" style={{ justifyContent: "space-around" }}>
        <Modal>
          <Modal.Open opens="edit">
            <ButtonIcon>
              <span>Edit</span>
              <MdOutlineEditNote />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Open opens="delete">
            <ButtonIcon>
              <span>Delete</span>
              <MdDeleteForever />
            </ButtonIcon>
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
      <ImagePage image={image} />

      <ButtonIcon onClick={() => navigate(-1)}>
        <span>Back</span>
        <MdOutlineArrowBack />
      </ButtonIcon>
    </Container>
  );
}
