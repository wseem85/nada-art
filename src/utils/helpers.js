// import { sort, parseISO } from "date-fns";
export const media = (query) => `@media (min-width: ${query})`;

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
