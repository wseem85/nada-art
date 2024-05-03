import styled from "styled-components";
import { useAllImages } from "../../features/images/useAllImages";
// import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import MiniPictureBox from "../../ui/MiniPictureBox";

const SimilarImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  margin-top: 2.3rem;
  margin-bottom: 1.3rem;
  & > h3 {
    text-align: center;
  }
  & > div {
    display: flex;
    gap: 1.3rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  & > button {
    margin-left: auto;
    margin-right: auto;
  }
`;

export default function SimilarImages({ image }) {
  const { allImages } = useAllImages();
  const {
    id,

    price,
    width,

    height,

    category,
  } = image || {};
  const similarCategory = allImages
    .filter((image) => image.category === category && !image.soldOut)
    .slice(0, 3);
  const similarSize = allImages
    .filter(
      (image) =>
        image.width === width && image.height === height && !image.soldOut
    )
    .slice(0, 3);
  const similarPrice = allImages
    .filter(
      (image) =>
        image.price >= price - 400 &&
        image.price <= price + 400 &&
        !image.soldOut
    )
    .slice(0, 3);
  const similarImages = [];
  for (const image of similarCategory) {
    if (!similarImages.find((i) => i.id === image.id) && image.id !== id)
      similarImages.push(image);
  }
  for (const image of similarSize) {
    if (
      !similarImages.find(
        (i) => i.width === image.width && i.height === image.height
      ) &&
      image.id !== id
    )
      similarImages.push(image);
  }
  for (const image of similarPrice) {
    if (!similarImages.find((i) => i.price === image.price) && image.id !== id)
      similarImages.push(image);
  }

  return (
    <SimilarImagesContainer>
      <Heading as="h3">You May also like </Heading>
      <div>
        {similarImages.map((image) => (
          <MiniPictureBox key={image.title} picture={image}></MiniPictureBox>
        ))}
      </div>
    </SimilarImagesContainer>
  );
}
