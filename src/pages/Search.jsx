// import { useNavigate } from "react-router-dom";
// import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Form from "../ui/Form";
import Spinner from "../ui/Spinner";
// import { ResponsiveFormRow } from "../ui/ResponsiveFormRow";
import { FormButton } from "../ui/FormButton";
// import FormRow from "../ui/FormRow";
// import Spinner from "../ui/Spinner";
// import Input from "../ui/Input";
import Select from "../ui/Select";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import { useEffect, useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import QuerySearch from "../ui/QuerySearch";
// import { useAllImages } from "../features/images/useAllImages";
import { useAllImages as useAllImagesQuery } from "../features/images/useAllImages";
import Input from "../ui/Input";
import PictureBox from "../features/images/PictureBox";
import { Section } from "../ui/Section";
import { useSearchResults } from "../contexts/SearchResultsContext";
import withScrollToTop from "../ui/withScroolToTop";
const options = [
  { label: "Max Price", value: "price" },
  { label: "Category", value: "category" },
  { label: "Title", value: "title" },
];
const SearchForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  background-color: transparent;
  ${media("600px")} {
    flex-direction: row;
  }
`;
const QueryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  ${media("550px")} {
    flex-direction: row;
  }

  ${media(breakpoints.sm)} {
    gap: 2.3rem;
  }
`;
const SearchByContainer = styled.div`
  display: flex;
  gap: 2.3rem;
  align-items: center;

  ${media(breakpoints.sm)} {
  }
`;
const PicturesContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  gap: 1rem;
  ${media("350px")} {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  ${media(breakpoints.sm)} {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
  ${media(breakpoints.md)} {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }

  ${media(breakpoints.lg)} {
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem;
  }
`;
const SearchHeading = styled(Heading)`
  font-size: 1.6rem;
  text-align: center;
  ${media(breakpoints.lg)} {
    font-size: 3.5rem;
  }
`;
const ResultsContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin-top: 2rem;
`;
// const contents = ["Maximum Price", "Category", "Title"];
function SearchComponent() {
  const { register, handleSubmit, setValue, getValues, unregister, formState } =
    useForm();
  const [searchBy, setSearchBy] = useState("price");
  const errors = formState.errors;
  // const [searchResult, setSearchResult] = useState(null);
  // const [currentIdx, setCurrentIdx] = useState(0);
  // const [isVisible, setIsVisible] = useState(false);
  // const queryClient = useQueryClient();
  const { allImages, isLoading } = useAllImagesQuery();
  const { searchResults, setSearchResults } = useSearchResults();
  // const navigate = useNavigate();
  function onSubmit({ searchBy: searchByForm, title, category, price }) {
    console.log(title, category, price, searchByForm);
    let result = [];
    if (searchByForm === "title") {
      result = allImages?.filter((image) =>
        image?.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    if (searchByForm === "category") {
      result = allImages?.filter((image) =>
        image.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    if (searchByForm === "price") {
      result = allImages?.filter((image) => image.price <= Number(price));
    }
    console.log(result);
    if (!result) setSearchResults([]);
    setSearchResults(result);
  }
  useEffect(() => {
    return () => {
      unregister("title");
      unregister("category");
      unregister("price"); // Unregister all fields for safety
    };
  }, [unregister]);
  useEffect(
    function () {
      register("price", { value: 4000 });
    },
    [register]
  );

  return (
    <Section style={{ borderTop: "none" }}>
      {isLoading && <Spinner />}
      <div style={{ display: "flex" }}>
        <SearchHeading
          as="h3"
          style={{
            textTransform: "uppercase",
            color: "var(--color-grey-500)",
            letterSpacing: "2px",
          }}
        >
          Search By ...
          <span
            style={{
              display: "inline-block",
              lineHeight: "1.6",
              color: "var(--color-green-700)",
            }}
          >
            Max Price,{" "}
          </span>
          <span
            style={{
              display: "inline-block",
              lineHeight: "1.6",
              color: "var(--color-blue-700)",
            }}
          >
            {" "}
            Title,
          </span>
          <span
            style={{
              display: "inline-block",
              lineHeight: "1.6",
              color: "var(--color-silver-700)",
            }}
          >
            {" "}
            and Category .
          </span>
        </SearchHeading>
      </div>

      <SearchForm onSubmit={handleSubmit(onSubmit)} type="regular">
        <QueryContainer>
          <SearchByContainer>
            <label style={{ lineHeight: "1.6" }}>Search By</label>
            <Select
              id="searchBy"
              name="searchBy"
              // dValue={getValues().price}
              {...register("searchBy", { value: "price" })}
              onChange={(e) => {
                setValue("searchBy", e.target.value);
                unregister("title");
                unregister("category");
                unregister("price");

                setSearchBy(e.target.value);
              }}
              options={options}
              // value={searchBy}
            />
          </SearchByContainer>

          {searchBy === "title" && (
            <>
              <Input
                style={{ maxWidth: "250px" }}
                name="title"
                id="title"
                type="text"
                defaultValue=""
                onChange={(e) => setValue("title", e.target.value)}
                {...register("title", {
                  required: "this feild is required",
                  minLength: {
                    value: 2,
                    message: "Start By typing at least 2 Characters",
                  },
                })}
              />
              {errors?.title && (
                <p style={{ color: "var(--color-red-700)" }}>
                  {errors.title.message}
                </p>
              )}
            </>
          )}
          {searchBy === "category" && (
            <>
              <Input
                style={{ maxWidth: "250px" }}
                name="category"
                id="category"
                type="text"
                defaultValue=""
                {...register("category", {
                  required: "this feild is required",
                  minLength: {
                    value: 2,
                    message: "Start By typing at least 3 Characters",
                  },
                })}
                onChange={(e) => setValue("category", e.target.value)}
              />
              {errors?.category && (
                <p style={{ color: "var(--color-red-700)" }}>
                  {errors.category.message}
                </p>
              )}
            </>
          )}
          {searchBy === "price" && (
            <Input
              style={{ maxWidth: "250px" }}
              type="number"
              name="price"
              id="price"
              defaultValue={4000}
              {...register("price", { value: getValues().price })}
              onChange={(e) => setValue("price", e.target.value)}
            />
          )}
        </QueryContainer>

        <FormButton style={{ margin: "0" }}>Search</FormButton>
      </SearchForm>

      <ResultsContainer>
        {searchResults === null ? (
          <p>
            Start Searching for a specific artwork title,category or max price{" "}
          </p>
        ) : (
          <p>
            {searchResults.length === 0
              ? " There are no Products match your search"
              : `${searchResults.length} Products`}
          </p>
        )}
      </ResultsContainer>
      <PicturesContainer>
        {searchResults !== null &&
          searchResults?.length !== 0 &&
          searchResults.map((image) => (
            <PictureBox
              key={image.title}
              picture={image}
              clearParams={true}
            ></PictureBox>
          ))}
      </PicturesContainer>
    </Section>
  );
}

const Search = withScrollToTop(SearchComponent);
export default Search;
