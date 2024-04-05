import styled from "styled-components";
import Paragraph from "./Pharagraph";
import { Section } from "./Section";

import SectionHeading from "./SectionHeading";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import FormRow from "./FormRow";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import TextArea from "./TextArea";
import Heading from "./Heading";
const Container = styled.div`
  display: grid;
  max-width: 100vw;
  gap: 1.3rem;

  ${media(breakpoints.sm)} {
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    align-items: center;
  }
`;
const ProfileImage = styled.img`
  width: 80%;
  height: 80%;
  max-width: 80%;
`;

export default function MeetTheArtist() {
  return (
    <Section>
      <SectionHeading>Hi I Am Nada</SectionHeading>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100vw",
          }}
        >
          <ProfileImage src="images/bg-hero.webp" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            padding: "0 2rem",
          }}
        >
          <div>
            <blockquote style={{ fontStyle: "italic" }}>
              Art washes away from the soul the dust of everyday life
            </blockquote>
            <q
              style={{
                display: "block",
                textAlign: "right",
                width: "80%",
                marginTop: "0.3rem",
              }}
            >
              Pablo Picasso
            </q>
          </div>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            vitae, dolorem non ratione ut aut corrupti nobis fugiat
            exercitationem doloremque reprehenderit beatae, minima molestias
            similique id eveniet repellendus natus explicabo?
          </Paragraph>
        </div>
      </Container>
      <div style={{ maxWidth: "70vw", margin: "1.3rem auto" }}>
        <Heading as="h3" style={{ marginTop: "2rem" }}>
          Contact Me..
        </Heading>
        <Form>
          <FormRow label="Full Name">
            <Input type="text" />
          </FormRow>
          <FormRow label="Email">
            <Input type="email" />
          </FormRow>
          <FormRow label="Phone Number">
            <Input type="text" />
          </FormRow>
          <FormRow>
            <TextArea />
            <Button>Send</Button>
          </FormRow>
        </Form>
      </div>
    </Section>
  );
}
