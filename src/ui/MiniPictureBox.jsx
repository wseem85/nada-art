import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const MiniPictureBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  justify-content: space-between;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-50);
  padding: 1rem;
  border-radius: var(--border-radius-md);
  overflow-x: scroll;
`;
// const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   display: none;
//   width: 100%;
//   height: 100%;
//   background-color: var(--color-brand-xsmallTransparency);
// `;
const PictureBoxImage = styled.div`
  cursor: pointer;
  /* width: 200px; */
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 5/6;

  transition: 0.2s;

  display: block;
`;
const PictureBoxDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-300);

  padding: 0.3rem 0.5rem;
`;

export default function MiniPictureBox({ picture }) {
  const { id, title, src } = picture;
  let currentPath = useLocation().pathname;
  console.log(currentPath);
  const { id: currentImageId } = useParams();
  console.log(currentImageId);
  if (currentPath.endsWith(currentImageId)) {
    currentPath = currentPath.slice(
      0,
      currentPath.length - currentImageId.length
    );
  }
  return (
    <Link to={`${currentPath}${id}`}>
      <MiniPictureBoxContainer>
        <PictureBoxImage>
          <Image src={src} alt={`Image ${title}`}></Image>
        </PictureBoxImage>

        <PictureBoxDetails> click for Details &rarr;</PictureBoxDetails>
      </MiniPictureBoxContainer>
    </Link>
  );
}
