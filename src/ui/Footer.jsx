// import { FaCcPaypal, FaCcApplePay, FaGooglePay } from "react-icons/fa";
// import { RiVisaFill, RiMastercardFill } from "react-icons/ri";
import styled from "styled-components";
// import { media } from "../utils/helpers";
// import { breakpoints } from "../utils/variables";
import Row from "./Row";
import { StyledLogo } from "./Logo";
// import ButtonIcon from "./ButtonIcon";
import Heading from "./Heading";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
const FooterRow = styled(Row)`
  flex-direction: column;
  ${media(breakpoints.sm)} {
    flex-direction: row;
  }
`;
const StyledFooter = styled.footer`
  background-color: var(--color-brown-50);
  color: var(--color-brand-700);
  padding: 1.5rem 2.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  gap: 3rem;
  position: relative;
  top: 4rem;
`;
const IconsContainer = styled.div`
  flex: 1;
  display: grid;
  max-width: 25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  ${media(breakpoints.sm)} {
  }
`;
const IconTooltip = styled.span`
  position: absolute;
  width: 10rem;
  /* padding: 0.3rem 0.3rem; */
  text-align: center;
  color: var(--color-grey-100);
  transition: all 0.3 ease;
  font-size: 1rem;
  top: -0.5rem;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  text-transform: capitalize;
  visibility: hidden;
`;
const IconContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 3rem;
  height: 3rem;
  padding: 0.3rem;
  display: flex;

  justify-content: center;
  align-items: center;
  &:hover > ${IconTooltip} {
    visibility: visible;
  }
`;
const IconImg = styled.img`
  max-width: 100%;
  width: 100%;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FooterRow
        type="horizontal"
        style={{ justifyContent: "center", gap: "2rem" }}
      >
        <Heading as="h3"> We Accept</Heading>
        <IconsContainer>
          <IconContainer>
            <IconImg src="logos/mastercard.svg" />
            <IconTooltip>Master card</IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/visa.svg" />
            <IconTooltip>Visa card</IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/americanexpress.svg" />
            <IconTooltip style={{ top: "-1.3rem" }}>
              American Express
            </IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/applepay.svg" />
            <IconTooltip>Apple pay</IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/shoppay.svg" />
            <IconTooltip>Shop Pay</IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/googlepay.svg" />
            <IconTooltip>google pay</IconTooltip>
          </IconContainer>
        </IconsContainer>
      </FooterRow>
      <FooterRow
        type="horizontal"
        style={{ justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}
      >
        <StyledLogo>Nada Art</StyledLogo>

        <IconsContainer>
          <a href="https://www.instagram.com/nadakh.art/" target="_blank">
            <IconContainer>
              <IconImg src="logos/Instagram.svg" />
              <IconTooltip>Instagram</IconTooltip>
            </IconContainer>
          </a>
          <a href="https://www.facebook.com/nada.kh3" target="_blank">
            <IconContainer>
              <IconImg src="logos/facebook.svg" />
              <IconTooltip>Facebook</IconTooltip>
            </IconContainer>
          </a>
          <a href="https://wa.me/0012192266526" target="_blank">
            <IconContainer>
              <IconImg src="logos/whatsapp.svg" />
              <IconTooltip>Whatsapp</IconTooltip>
            </IconContainer>
          </a>
        </IconsContainer>
        <div>All Rights Reserved &copy; 2024</div>
      </FooterRow>
    </StyledFooter>
  );
}
