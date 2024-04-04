import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaGooglePay,
} from "react-icons/fa";
import styled from "styled-components";
// import { media } from "../utils/helpers";
// import { breakpoints } from "../utils/variables";
import Row from "./Row";
import Logo from "./Logo";
import ButtonIcon from "./ButtonIcon";
import Heading from "./Heading";
const StyledFooter = styled.footer`
  padding: 1.5rem 2.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  gap: 3rem;
`;
const IconAcceptedPayment = styled(ButtonIcon)`
  width: "3.2rem";
  height: "3.2rem";
  & svg {
    color: var(--color-brand-300);
  }
  &:hover {
    background-color: initial;
  }
`;
const IconSocialFooter = styled(ButtonIcon)`
  width: "3.2rem";
  height: "3.2rem";
  & svg {
    color: var(--color-brand-300);
  }
  &:hover svg {
    color: var(--color-brand-600);
  }
`;
export default function Footer() {
  return (
    <StyledFooter>
      <Row type="horizontal">
        <Heading as="h3"> We Accept</Heading>
        <div>
          <IconAcceptedPayment>
            <FaCcVisa />
          </IconAcceptedPayment>
          <IconAcceptedPayment>
            <FaCcMastercard />
          </IconAcceptedPayment>
          <IconAcceptedPayment>
            <FaCcPaypal />
          </IconAcceptedPayment>
          <IconAcceptedPayment>
            <FaCcApplePay />
          </IconAcceptedPayment>
          <IconAcceptedPayment>
            <FaGooglePay />
          </IconAcceptedPayment>
        </div>
      </Row>
      <Row type="horizontal">
        <Logo />

        <div>
          <IconSocialFooter>
            <FaFacebook />
          </IconSocialFooter>
          <IconSocialFooter>
            <FaInstagram />
          </IconSocialFooter>
          <IconSocialFooter>
            <FaWhatsapp />
          </IconSocialFooter>
        </div>
        <div>All Rights Reserved &copy; 2024</div>
      </Row>
    </StyledFooter>
  );
}
