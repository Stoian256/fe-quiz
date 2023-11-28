import React, { createContext, useContext, useState, useEffect } from "react";
import { Question } from "@shadcn/utils/interfaces/typescriptGeneral";
import { getQuestions } from "@shadcn/services/questions.service";
import { useAuth } from "./authContext";

type PaginationContextType = {
  // filters: Filters,
  // setFilters: React.Dispatch<React.SetStateAction<Filters >>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  pageNumber: number;
  itemsPerPage: number;
  numbersOfPages: number;
  handleArrowClick: (direction: string) => void;
  handleItemsPerPage: (e: React.SetStateAction<string>) => void;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
);

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { accessToken } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken) {
    
    // const tagsArray: Tag[] = [];

    const difficulties = "easy"; 
    const keyword ="best"

    const queryParams = new URLSearchParams({
      itemsPerPage: itemsPerPage.toString(),
      pageIndex: pageNumber.toString(),
      difficulties: difficulties,
      keyword: keyword,
      // tags: JSON.stringify(tagsArray)
    });

          const data = await getQuestions(accessToken, queryParams.toString());
                    setQuestions(data.content);

          setItemsPerPage(data.pageable.pageSize);
          setPageNumber(data.pageable.pageNumber);
          
          console.log("Fetched data:", data);
          // console.log("Fetched questions content :", fetchedData.content);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [pageNumber, itemsPerPage]);

  const handleArrowClick = (direction: string) => {
    if (direction === "left") {
      if (pageNumber === 1) return;
      setPageNumber((prevPage) => prevPage - 1);
    } else if (direction === "right") {
      const totalPages = Math.ceil(questions.length / itemsPerPage);
      if (pageNumber === totalPages) return;
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const numbersOfPages = Math.ceil(questions.length / itemsPerPage);

  const handleItemsPerPage = (
    value: string | ((prevValue: string) => string)
  ) => {
    const perPage =
      typeof value === "string"
        ? parseInt(value, 10)
        : parseInt(value(pageNumber.toString()), 10);
    setItemsPerPage(perPage);
    setPageNumber(1);
  };

  const dispatchItemsPerPage: React.Dispatch<React.SetStateAction<number>> = (
    value
  ) => {
    if (typeof value === "function") {
      setItemsPerPage((prevItemsPerPage) => {
        const newValue = value(prevItemsPerPage);
        return typeof newValue === "string" ? parseInt(newValue, 10) : newValue;
      });
    } else {
      setItemsPerPage(value);
    }
  };

  const value: PaginationContextType = {
    questions,
    setQuestions,
    pageNumber,
    setPageNumber,
    itemsPerPage,
    setItemsPerPage: dispatchItemsPerPage,
    numbersOfPages,
    handleArrowClick,
    handleItemsPerPage
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
