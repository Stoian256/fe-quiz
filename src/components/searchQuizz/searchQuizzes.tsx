import SearchQuizzCard from "./searchQuizzCard";
import React, { useEffect, useState } from "react";
import { getTags } from "@shadcn/services/tags.service";
import { useAuth } from "@shadcn/context/authContext";
import SearchQuizzesTag from "./searchQuizzesTag";
import { Badge } from "../ui/badge";

const SearchQuizzes = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const [topTags, setTopTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [requestBodyTag, setRequestBodyTag] = useState({});
  const [prefix, setPrefix] = useState("");
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [manuallyAddedTags, setManuallyAddedTags] = useState<string[]>([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken) {
          const data = await getTags(accessToken, {}); // change when we have the topTags endpoint
          setTopTags(
            data.slice(15).map((tag: { tagTitle: string }) => tag.tagTitle)
          );
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
          const data = await getTags(accessToken, requestBodyTag);

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

  const handleBagdeClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const selectedTag = e.currentTarget.title;
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
    setRequestBodyTag({
      prefix: pref,
      excludedTags: topTags
    });
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
    // fetch API data to get quizzes here
  };

  return (
    <div className="p-5">
      {/* ADD NAVBAR HERE */}
      <div className="flex flex-col gap-2">
        <h3 className="text-5xl">Quiz Search</h3>
        <p>Showing quizzes for:</p>
        <div className="flex gap-2">
          {selectedTags.map((tag) => (
            <div className="flex">
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

        {/*  */}
        <SearchQuizzCard
          title="Quiz 1 Title"
          tags={["reac", "re", "tag"]}
          difficulty="Easy"
          timeLimit={90}
        />
      </div>
    </div>
  );
};

export default SearchQuizzes;
