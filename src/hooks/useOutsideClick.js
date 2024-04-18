import { useEffect, useRef } from "react";
export default function useOutSideClick(handler, listenCapture = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapture);
      return () => document.removeEventListener("click", handleClick);
    },
    [handler, listenCapture]
  );
  return ref;
}
