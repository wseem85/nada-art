import SectionHeading from "./SectionHeading";
import { Section } from "./Section";

// import Paragraph from "./Paragraph";
import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

import { compareDesc, parseISO } from "date-fns";
import NewImageBox from "./NewImageBox";
const Container = styled.div`
  display: grid;
  ${media("350px")} {
    grid-template-columns: 1fr 1fr;
  }

  place-items: center;
  column-gap: 1.3rem;
  row-gap: 2.3rem;
  ${media(breakpoints.sm)} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default function NewArtWorks({ allImages }) {
  const sorted = allImages?.sort((obj1, obj2) => {
    const date1 = parseISO(obj1.created_at);
    const date2 = parseISO(obj2.created_at);

    // Use compareDesc for ascending order (latest to earliest)
    // Use compareAsc for descending order (earliest to latest)
    return compareDesc(date1, date2);
  });
  const newPictures = sorted?.slice(0, 6);

  return (
    <Section style={{ marginBottom: "2.3rem" }}>
      <SectionHeading>New Artworks</SectionHeading>

      <Container>
        {newPictures?.map((image) => (
          <NewImageBox key={image.id} image={image} />
        ))}
      </Container>
    </Section>
  );
}
