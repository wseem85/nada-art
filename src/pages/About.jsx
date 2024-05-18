// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import HeroAbout from "../ui/HeroAbout";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import Row from "../ui/Row";
import SocialMediaIcon from "../ui/SocialMediaIcon";
import Form from "../ui/Form";
import FormRowRegular from "../ui/FormRowRegular";
import { FormButton } from "../ui/FormButton";
import Input from "../ui/Input";
import Textarea from "../ui/TextArea";
// import { Section } from "../ui/Section";
// import Button from "../ui/Button";
const AboutPageContainer = styled.div`
  display: flex;
  background-color: var(--color-grey-100);
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  min-width: 100vw;
  overflow: hidden;
  padding-left: 1.3rem;
  padding-right: 1.3rem;
`;
const TitleMain = styled.div`
  color: #e5e5e5;
  font-size: 70%;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
  ${media("300px")} {
    font-size: 90%;
  }

  ${media("490px")} {
    font-size: 100%;
  }
  & > section {
    height: 50px;
    overflow: hidden;
    margin-left: 2.3rem;
    & > div {
      height: 100%;
      color: var(--color-grey-100);
    }
    & > div > h2 {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 1rem;
      padding-right: 1rem;
      color: var(--color-grey-100);
    }
    & > div > div {
      padding: 0.5rem 1rem;
      height: 100%;
      margin-bottom: 2.81rem;
      display: inline-block;
    }
    & > div:first-child {
      @keyframes text-animation {
        0% {
          margin-top: 0;
        }
        10% {
          margin-top: 0;
        }
        20% {
          margin-top: -5rem;
        }
        30% {
          margin-top: -5rem;
        }
        40% {
          margin-top: -10rem;
        }
        60% {
          margin-top: -10rem;
        }
        70% {
          margin-top: -5rem;
        }
        80% {
          margin-top: -5rem;
        }
        90% {
          margin-top: 0;
        }
        100% {
          margin-top: 0;
        }
      }

      animation: text-animation 8s infinite;
    }
    & > div > h2 {
      font-size: inherit;
    }
    & > div:first-child > h2 {
      background-color: var(--color-brand-700);
    }
    & > div:nth-child(2) > h2 {
      background-color: var(--color-blue-700);
    }
    & > div:nth-child(3) > h2 {
      background-color: var(--color-red-700);
    }
  }
  & > h1 {
    text-shadow: 0 0 7px rgba(255, 255, 255, 0.3),
      0 0 3px rgba(255, 255, 255, 0.3);
    color: var(--color-brand-500);
    font-size: inherit;
  }
`;
const ResponsiveRow = styled(Row)`
  justify-content: center;
  align-items: center;

  & > div {
    /* width: 50%; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > div:first-of-type {
    border: 1px solid var(--color-grey-300);
    border-left-color: var(--color-brand-300);
    border-top-color: var(--color-blue-700);
    border-right-color: var(--color-green-700);
    border-bottom-color: var(--color-red-700);
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    background-color: #fff;
  }
  & > div:last-of-type {
    flex-direction: column;
    gap: 1.6rem;
  }

  & > div > img {
    height: 80%;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  ${media(breakpoints.sm)} {
    flex-direction: row;
  }
  ${media(breakpoints.sm)} {
    & > div {
      width: 50%;
    }
  }
`;
const SocialMediaLink = styled.a`
  background-color: #fff;
  display: flex;
  /* font-size: 90%; */
  /* min-width: 11rem; */
  flex-direction: row;
  gap: 2.3rem;
  align-items: center;
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-sm);
  font-weight: 600;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    right: 45px;
    top: 50%;
    transform: translateY(-50%);
    width: 0; /* Set width to 0 for border-based arrow */
    height: 0; /* Set height to 0 for border-based arrow */
    border-left: 8px solid var(--color-brand-300); /* Left border for right arrow */
    border-top: 8px solid transparent; /* Top border for arrowhead */
    border-bottom: 8px solid transparent;
    animation: blink 1s infinite alternate;
    z-index: 1;
  }
  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;
export default function About() {
  // const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({});
  const errors = formState.errors;
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <AboutPageContainer>
      <HeroAbout />
      <TitleMain>
        <Heading as="h1">Hello 👋 I am</Heading>
        <section>
          <div>
            <Heading as="h2">Nada Kharma</Heading>
          </div>
          <div>
            <Heading as="h2"> An Artist</Heading>
          </div>

          <div>
            <Heading as="h2">A Painter</Heading>
          </div>
        </section>
      </TitleMain>

      <Row type="vertical">
        <Paragraph style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex itaque
          quasi, asperiores voluptatum ducimus iusto nam minima praesentium unde
          quis quidem pariatur molestiae ullam sit quam. Natus labore at ratione
          quam exercitationem aut quia modi atque minima numquam harum in,
          mollitia tenetur dicta totam iste, similique expedita impedit
          repellendus dolorem?
        </Paragraph>
        <div style={{ width: "100vw" }}>
          <img
            style={{ width: "100%" }}
            src="images/about-1.webp"
            alt="about image 1"
          />
        </div>
      </Row>
      <Row type="vertical" style={{ alignItems: "center" }}>
        <Heading as="h2">About Me</Heading>
        <Paragraph>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos placeat
          quam saepe, nemo provident nihil molestiae adipisci. Illum sunt amet
          molestias odit sapiente nemo et obcaecati sit minima itaque rerum, hic
          eius tempore.
        </Paragraph>
      </Row>
      <ResponsiveRow>
        <div>
          <img src="images/about-2.webp" />
        </div>
        <div>
          <Heading as="h2">Behind the Scenes</Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad
            architecto quae eligendi dolore? Atque illum magnam quae esse
            consequatur ad suscipit. Libero, tempora repudiandae.
          </Paragraph>
          <Heading as="h3" style={{ width: "100%", marginLeft: "1.5rem" }}>
            Thers is Always More on :
          </Heading>
          <Row
            type="horizontal"
            style={{
              gap: "2.5rem",
              justifyContent: "flex-start",
            }}
          >
            <SocialMediaLink
              href="https://www.instagram.com/nadakh.art/"
              target="_blank"
            >
              <span> Instagram</span>
              <SocialMediaIcon src="logos/Instagram.svg" text="Instagram" />
            </SocialMediaLink>
            <SocialMediaLink
              href="https://www.facebook.com/nada.kh3"
              target="_blank"
            >
              <span> Facebook</span>
              <SocialMediaIcon src="logos/facebook.svg" text="Facebook" />
            </SocialMediaLink>
          </Row>
        </div>
      </ResponsiveRow>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.3rem",
          width: "100vw",
        }}
      >
        <img src="images/about-6.webp" style={{ width: "100%" }} />
        <Heading style={{ padding: "1.3rem 2.3rem" }} as="h2">
          Contact Me
        </Heading>
        <Form
          style={{ padding: "1.3rem 2.3rem" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormRowRegular label="Full Name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: "this feild is required",
              })}
            />
          </FormRowRegular>
          <FormRowRegular label="Phone Number" error={errors?.phone?.message}>
            <Input
              type="number"
              id="phone"
              {...register("phone", {
                required: "this feild is required",
                pattern: {
                  value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                  message: "Invalid phone number",
                },
              })}
            />
          </FormRowRegular>
          <FormRowRegular label="Email Address" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "this feild is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
            />
          </FormRowRegular>
          <FormRowRegular label="Message" error={errors?.message?.message}>
            <Textarea
              type="text"
              id="message"
              {...register("message", {
                required: "please insert your message ",
              })}
            />
          </FormRowRegular>
          <FormRowRegular>
            <FormButton>Send</FormButton>
          </FormRowRegular>
        </Form>
      </div>
    </AboutPageContainer>
  );
}
