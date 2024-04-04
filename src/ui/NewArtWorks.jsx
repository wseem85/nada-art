import SectionHeading from "./SectionHeading";
import { Section } from "./Section";
import Paragraph from "./Pharagraph";
import styled, { css } from "styled-components";
import { formatCurrency, media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import Button from "./Button";

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
const images = [
  {
    title: "Title of Image 1",
    src: "images/img-1.jpg",
    price: 800,
    discount: 10,
    soldOut: false,
  },
  {
    title: " Title of Image 2",
    src: "images/img-2.jpg",
    price: 1200,
    discount: 20,
    soldOut: false,
  },
  {
    title: " Title of Image 3",
    src: "images/img-3.jpg",
    price: 600,
    discount: 0,
    soldOut: true,
  },
  {
    title: " Title of Image 4",
    src: "images/img-4.jpg",
    price: 780,
    discount: 0,
    soldOut: false,
  },
  {
    title: " Title of Image 5",
    src: "images/img-5.jpg",
    price: 850,
    discount: 12,
    solOut: true,
  },
  {
    title: " Title of Image 6",
    src: "images/img-6.jpg",
    price: 428,
    discount: 0,
    soldOut: false,
  },
  {
    title: " Title of Image 7",
    src: "images/img-7.jpg",
    price: 645,
    discount: 12,
    soldOut: false,
  },
  {
    title: " Title of Image 8",
    src: "images/img-8.jpg",
    price: 427,
    discount: 0,
    soldOut: true,
  },
];
export default function NewArtWorks() {
  return (
    <Section>
      <SectionHeading>New Artworks</SectionHeading>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
        voluptatem consequuntur tempora at iure architecto nam sint nesciunt
        molestiae ipsa eveniet doloremque sapiente porro amet animi, fuga quia
        libero nulla. Porro voluptatibus dignissimos qui autem amet ratione
        aliquid saepe necessitatibus!
      </Paragraph>
      <Container>
        {images.map((image) => (
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
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <h3>{image.title}</h3>
              {!image.soldOut && image.discount !== 0 && (
                <>
                  <p
                    style={{
                      color: "var(--color-brand-400)",
                      textDecoration: "line-through",
                      marginLeft: "5rem",
                      marginRight: "1.5rem",
                    }}
                  >
                    {formatCurrency(image.price)}
                  </p>
                  <p
                    style={{
                      color: "var(--color-green-700)",
                      fontWeight: "bold",
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
                    fontWeight: "bold",
                  }}
                >
                  {formatCurrency(image.price)}
                </p>
              )}

              {image.soldOut && (
                <p
                  style={{
                    color: "var(--color-grey-700)",
                    fontWeight: "bold",
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
