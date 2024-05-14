// import { useImages } from "../features/images/useImages";
import Error from "../ui/Error";
import Paragraph from "../ui/Paragraph";
import Spinner from "../ui/Spinner";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import PictureBox from "../features/images/PictureBox";
import styled from "styled-components";
// import { useEffect } from "react";
import Heading from "../ui/Heading";
export const PicturesContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  place-items: center;
  gap: 1rem;
  ${media("350px")} {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  ${media(breakpoints.sm)} {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
  }

  ${media(breakpoints.lg)} {
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem;
  }
`;

export default function FilteredOriginals({
  images,
  errorImages,
  isLoadingImages,
}) {
  return (
    <>
      {errorImages && <Error>Somthing went wrong {errorImages.message}</Error>}
      {images?.length === 0 ? (
        <Paragraph>There are No Images matches Your Search </Paragraph>
      ) : (
        ""
      )}
      <Heading
        as="h4"
        style={{
          marginTop: "1.3rem",
          textAlign: "center",
          color: "var(--color-green-700)",
        }}
      >
        {images?.length} Products
      </Heading>
      <div>
        {isLoadingImages && <Spinner />}
        {errorImages && <Error message={errorImages.message} />}
        {images?.length === 0 && (
          <p>There is no pictures matches your search</p>
        )}
      </div>
      <PicturesContainer>
        {images?.map((image) => (
          <PictureBox key={image.title} picture={image}></PictureBox>
        ))}
      </PicturesContainer>
    </>
  );
}
