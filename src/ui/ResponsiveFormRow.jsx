import styled from "styled-components";
import Row from "./Row";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

export const ResponsiveFormRow = styled(Row)`
  flex-direction: column;
  margin-bottom: 2rem;
  ${media(breakpoints.sm)} {
    flex-direction: row;
  }
`;
