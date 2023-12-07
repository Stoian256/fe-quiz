import React, { createContext, useContext, useState, useEffect } from "react";
import { Filters } from "@shadcn/utils/interfaces/typescriptGeneral";
import { useAuth } from "./authContext";
import { Quizz } from "@shadcn/utils/interfaces/Quizz";
import { getQuizzes } from "@shadcn/services/quizzes.service";

type PaginationContextTypeQuizz = {
  quizzes: Quizz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quizz[]>>;
  updateQuizes: () => Promise<void>;
  filtersQuizz: Filters;
  setFiltersQuizz: React.Dispatch<React.SetStateAction<Filters>>;
  pageNumber: number;
  itemsPerPage: number;
  numbersOfPages: number;
  handleArrowClick: (direction: string) => void;
  handleItemsPerPage: (e: React.SetStateAction<string>) => void;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

const FilterAndPaginationContextQuizzes = createContext<
  PaginationContextTypeQuizz | undefined
>(undefined);

export const useFilterAndPaginationQuizz = () => {
  const context = useContext(FilterAndPaginationContextQuizzes);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

export const FilterAndPaginationQuizzProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { accessToken } = useAuth();
  const [quizzes, setQuizzes] = useState<Quizz[]>([]);
  const [filtersQuizz, setFiltersQuizz] = useState<Filters>({
    keyword: [],
    difficulty: [],
    tags: []
  });

  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken) {
          const data = await getQuizzes(
            accessToken,
            filtersQuizz,
            itemsPerPage,
            pageNumber
          );

          setQuizzes(data.content);
          setItemsPerPage(data.pageable.pageSize);
          setPageNumber(data.pageable.pageNumber);
          setTotalElements(data.totalElements);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [pageNumber, itemsPerPage, filtersQuizz]);

  const handleArrowClick = (direction: string) => {
    if (direction === "left") {
      if (pageNumber === 0) return;
      setPageNumber((prevPage) => prevPage - 1);
    } else if (direction === "right") {
      const totalPages = Math.ceil(quizzes.length / itemsPerPage);
      if (pageNumber === totalPages) return;
      setPageNumber((prevPage) => prevPage + 1);
    }
  };
  const numbersOfPages = Math.ceil(totalElements / itemsPerPage);

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

  const updateQuizes = async () => {
    try {
      if (accessToken) {
        const data = await getQuizzes(
          accessToken,
          filtersQuizz,
          itemsPerPage,
          pageNumber
        );
        setQuizzes(data.content);
        setItemsPerPage(data.pageable.pageSize);
        setPageNumber(data.pageable.pageNumber);
        setTotalElements(data.totalElements);
      }
    } catch (error) {
      console.error("Error updating questions:", error);
    }
  };

  const value: PaginationContextTypeQuizz = {
    quizzes,
    setQuizzes,
    filtersQuizz,
    setFiltersQuizz,
    pageNumber,
    setPageNumber,
    itemsPerPage,
    setItemsPerPage: dispatchItemsPerPage,
    numbersOfPages,
    handleArrowClick,
    handleItemsPerPage,
    updateQuizes
  };

  return (
    <FilterAndPaginationContextQuizzes.Provider value={value}>
      {children}
    </FilterAndPaginationContextQuizzes.Provider>
  );
};
