import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const MiniPictureBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  justify-content: space-between;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-50);
  padding: 2rem;
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
  width: 200px;
`;
const Image = styled.img`
  width: 100%;
  max-width: 100%;
  transform: translateZ(0);
  transition: 0.2s;

  display: block;
  @keyframes scale-on {
    to {
      transform: translateZ(20px);
    }
  }
  &:hover {
    animation: scale-on 0.3s ease forwards;
  }
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
  const { id: currentImageId } = useParams();
  console.log(currentImageId);
  if (currentPath.endsWith(currentImageId)) {
    currentPath = currentPath.slice(0, currentPath.length - 2);
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
