import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  --opacity-50: 0.5;
  --font-sm: 1.2rem;
  --font-md: 1.6rem;
  --font-xmd: 1.8rem;
  --font-lg: 2rem;
  --font-xl: 3rem;
  --font-xxl:4rem;
  --font-xxxl:5rem;
  /* Indigo */
  --color-brand-highTransparency:rgb(96,31,17,0.1);
  --color-brand-midTransparency:rgb(96,31,17,0.3);
  --color-brand-smallTransparency:rgb(96,31,17,0.5);
  --color-brand-xsmallTransparency:rgb(96,31,17,0.6);
  --color-brand-50: #fcf2f0;
  --color-brand-100: #efb3a7;
  --color-brand-200: #e78c79;
  --color-brand-300: #db553a;
  --color-brand-400: #c64024;
  --color-brand-500: #ad3720;
  --color-brand-600: #99311c;
  --color-brand-700: #892C19;
  --color-brand-800: #7a2716;
  --color-brand-900: #601f11;

   --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  /* Grey */
   &,&.light-mode {
    --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #2C1989;
  --color-green-100: #dcfce7;
  --color-green-700: #19892C;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;



  --backdrop-color: rgba(255, 255, 255, 0.1);}

  --shadow-sm: 0 1px 2px rgba(96,31,17, 0.08);
  --shadow-md: 0px 0.6rem 2.4rem rgba(96,31,17, 0.1);
  --shadow-lg: 0 2.4rem 3.2rem rgba(96,31,17, 0.15);
  --line-sm: 1.2;
  --line-md: 1.5;
  --line-lg: 2;
  --letter-space-sm: 1.3px;
  --letter-space-md: 1.5px;
  --letter-space-lg: 1.8px;


  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}
 &.dark-mode{
  --color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
 }
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family:"PT Sans Caption", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

.width-zero{
  width: 0;
}
.width-full{
  width: 100vw;
}
.span-after{
  width: 0;
  height: 3px;
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-brand-500);
  transition: 0.5s;
}
.half-opacity{
  opacity: 0.5;
}

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
`;
export default GlobalStyles;
