import SectionHeading from "./SectionHeading";
import { Section } from "./Section";
// import Paragraph from "./Paragraph";
import styled, { css } from "styled-components";
import { formatCurrency, media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import Button from "./Button";
import { compareDesc, parseISO } from "date-fns";
const Container = styled.div`
  display: grid;
  /* grid-template-columns: 1fr; */
  place-items: center;
  column-gap: 3.5rem;
  row-gap: 5rem;
  ${media(breakpoints.sm)} {
    grid-template-columns: 1fr 1fr;
  }
  ${media(breakpoints.md)} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const NewImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Image = styled.img`
  width: 100%;
  ${(props) =>
    props.soldOut === true &&
    css`
      opacity: 0.5;
    `}
`;
const Sale = styled.p`
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--color-grey-50);
  ${(props) =>
    props.sale &&
    css`
      color: var(--color-green-700);
    `}
  ${(props) =>
    props.soldOut &&
    css`
      color: var(--color-red-700);
    `}
`;

export default function NewArtWorks({ allImages }) {
  const sorted = allImages.sort((obj1, obj2) => {
    const date1 = parseISO(obj1.created_at);
    const date2 = parseISO(obj2.created_at);

    // Use compareDesc for ascending order (latest to earliest)
    // Use compareAsc for descending order (earliest to latest)
    return compareDesc(date1, date2);
  });
  const newPictures = sorted.slice(0, 6);

  return (
    <Section>
      <SectionHeading>New Artworks</SectionHeading>

      <Container>
        {newPictures.map((image) => (
          <NewImageBox key={image.title}>
            <div style={{ maxWidth: "350px", position: "relative" }}>
              {image.soldOut || image.discount ? (
                <Sale sale={image.discount} soldOut={image.soldOut}>
                  {image.soldOut ? "Sold Out" : `Sale ${image.discount}%`}
                </Sale>
              ) : (
                ""
              )}
              <Image src={image.src} soldOut={image.soldOut} />
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ flex: "1", fontSize: "1.35rem" }}>{image.title}</h3>
              {!image.soldOut && image.discount !== 0 && (
                <>
                  <p
                    style={{
                      color: "var(--color-brand-400)",
                      textDecoration: "line-through",

                      fontWeight: "700",
                      marginLeft: "5rem",
                      marginRight: "1.5rem",
                    }}
                  >
                    {formatCurrency(image.price)}
                  </p>
                  <p
                    style={{
                      color: "var(--color-green-700)",
                      fontWeight: "700",
                    }}
                  >
                    {formatCurrency(
                      image.price - (image.price * image.discount) / 100
                    )}
                  </p>
                </>
              )}
              {!image.soldOut && !image.discount && (
                <p
                  style={{
                    color: "var(--color-grey-700)",
                    fontWeight: "600",
                  }}
                >
                  {formatCurrency(image.price)}
                </p>
              )}

              {image.soldOut && (
                <p
                  style={{
                    color: "var(--color-grey-700)",
                    fontWeight: "600",
                  }}
                >
                  {formatCurrency(
                    image.discount
                      ? image.price - (image.price * image.discount) / 100
                      : image.price
                  )}
                </p>
              )}
            </div>
            <Button size="large" variation="primary">
              {image.soldOut ? "Search Similar  " : "Add To Cart"}
            </Button>
          </NewImageBox>
        ))}
      </Container>
    </Section>
  );
}
