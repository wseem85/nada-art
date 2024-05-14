import { useState, createContext, useContext, cloneElement } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutSideClick from "../../hooks/useOutsideClick";
import styled from "styled-components";
import { media } from "../../utils/helpers";
import { breakpoints } from "../../utils/variables";
const StyledModal = styled.div`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  /* height: calc(100vh - 2rem); */
  /* min-height: 100%; */
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 0.5rem 0.7rem;
  transition: all 0.5s;
  z-index: 8888;
  /* overflow-y: scroll; */
  ${media(breakpoints.sm)} {
    width: 80%;
    padding: 2.5rem 2rem;
    /* height: 80vh; */
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Overlay = styled.div`
  min-height: 100%;
  position: fixed;
  z-index: 8880;
  top: 0;
  left: 0;
  width: 100%;
  /* min-height: 150%; */
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  /* overflow-x: h; */
  transition: all 0.5s;
  ${media(breakpoints.sm)} {
    /* min-height: 100vh; */
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.3rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 0.2rem;
  right: 0.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();
export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}
function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutSideClick(close);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

function Open({ opens, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

Modal.Window = Window;
Modal.Open = Open;
