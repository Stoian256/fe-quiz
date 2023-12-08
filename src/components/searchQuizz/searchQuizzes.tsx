import SearchQuizzCard from "./searchQuizzCard";
import React, { useEffect, useState } from "react";
import { getTopTags } from "@shadcn/services/tags.service";
import { useAuth } from "@shadcn/context/authContext";
import SearchQuizzesTag from "./searchQuizzesTag";
import { Badge } from "../ui/badge";
import { quizzSearchByTags } from "@shadcn/services/quizzes.service";
import { Quizz } from "@shadcn/utils/interfaces/Quizz";
import { Button } from "../ui/button";

const SearchQuizzes = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const [topTags, setTopTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [prefix, setPrefix] = useState("");
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [manuallyAddedTags, setManuallyAddedTags] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [quizzes, setQuizzes] = useState<Quizz[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const { accessToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken) {
          const data = await getTopTags(accessToken, 15);
          const onlyTitleTagData = data.map(
            (tag: { tagTitle: string }) => tag.tagTitle
          );
          setTopTags(onlyTitleTagData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken) {
          const data = await getTopTags(accessToken, 10, prefix.charAt(0).toUpperCase() + prefix.slice(1), topTags);
          console.log(data);
          setGeneratedTags(
            data.map((tag: { tagTitle: string }) => tag.tagTitle)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [prefix]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken) {
          const data = await quizzSearchByTags(
            accessToken,
            5,
            pageIndex,
            selectedTags
          );
          setQuizzes((prevQuizzes) => [...prevQuizzes, ...data.content]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [pageIndex]);

  useEffect(() => {
    async function fetchData() {
      setPageIndex(0);
      setQuizzes([]);
      try {
        if (accessToken) {
          const data = await quizzSearchByTags(
            accessToken,
            5,
            pageIndex,
            selectedTags
          );
          setQuizzes((prevQuizzes) => [...prevQuizzes, ...data.content]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [selectedTags]);

  const handleBagdeClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const selectedTag = e.currentTarget.title;
    if (selectedTags.includes(selectedTag)) {
      return;
    }
    setSelectedTags((prevTags) => [...prevTags, selectedTag]);
  };

  const handleDeleteTag = (tagTitle: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagTitle));
    if ((manuallyAddedTags as string[]).includes(tagTitle)) {
      setManuallyAddedTags((prevTags) =>
        prevTags.filter((prevTag) => prevTag !== tagTitle)
      );
      setTopTags((prevTags) => prevTags.filter((tag) => tag !== tagTitle));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pref = e.target.value;
    setPrefix(pref);
  };

  const handleTagSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const selectedTag = e.currentTarget.innerHTML;
    setSelectedTags((prevTags) => [...prevTags, selectedTag]);
    setTopTags((prevTags) => [...prevTags, selectedTag]);
    setManuallyAddedTags((prevTags) => [...prevTags, selectedTag]);
  };

  const handleTopicsSearch = () => {
    if (selectedTags.length === 0) {
    } else {
      async function fetchData() {
        try {
          if (accessToken) {
            const data = await quizzSearchByTags(
              accessToken,
              5,
              pageIndex,
              selectedTags
            );
            setQuizzes(data.content);
            setTotalElements(data.totalElements);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  };

  const handleLoadMore = () => {
    setPageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="p-5">
      {/* ADD NAVBAR HERE */}
      <div className="flex flex-col gap-2">
        <h3 className="text-5xl">Quiz Search</h3>
        {selectedTags.length > 0 && <p>Showing quizzes for:</p>}
        <div className="flex gap-2 flex-wrap">
          {selectedTags.map((tag, index) => (
            <div className="flex" key={`${index}-${tag}`}>
              <Badge
                className="ml-3 py-1 px-3 rounded-none bg-yellow-400
           text-black font-bold text-base hover:bg-yellow-400"
              >
                {tag}
              </Badge>
              <span
                className="bg-black py-1 pt-2 font-bold px-2 text-white text-justify cursor-pointer"
                onClick={() => handleDeleteTag(tag)}
              >
                X
              </span>
            </div>
          ))}
          <SearchQuizzesTag
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            topTags={topTags}
            selectedTags={selectedTags}
            handleBagdeClick={handleBagdeClick}
            handleDeleteTag={handleDeleteTag}
            generatedTags={generatedTags}
            handleInputChange={handleInputChange}
            handleTagSelect={handleTagSelect}
            prefix={prefix}
            setPrefix={setPrefix}
            setGeneratedTags={setGeneratedTags}
            handleTopicsSearch={handleTopicsSearch}
          />
        </div>
        {selectedTags.length === 0 ? (
          <p className="text-2xl">
            No tags selected. Please select at least one tag to continue by
            clicking Add Tags above!
          </p>
        ) : (
          quizzes.map((quizz, index) => (
            <SearchQuizzCard key={`${quizz.id}-${index}`} {...quizz} />
          ))
        )}
        {totalElements >= (pageIndex + 1) * 5 && (
          <Button
            onClick={handleLoadMore}
            className={`bg-yellow-400 text-white rounded-none hover:bg-yellow-500 p-2 px-10 shadow-lg self-center`}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchQuizzes;
