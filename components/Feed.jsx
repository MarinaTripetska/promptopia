"use client";
import { useState, useEffect } from "react";
import { getPosts } from "@utils/APIrequests";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  //Search states
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await getPosts();
        if (resp.ok) {
          const posts = await resp.json();
          setPosts(posts);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    const filteredPrompts = posts.filter(
      (prompt) =>
        regex.test(prompt.creator.username) ||
        regex.test(prompt.tag) ||
        regex.test(prompt.prompt)
    );

    return filteredPrompts;
  };

  const handleSearchChange = (e) => {
    //Clear timeout if exists
    clearTimeout(searchTimeout);

    //Set search text
    const searchText = e.target.value;

    //If search text is empty, clear search results
    if (!searchText.trim()) {
      setSearchText("");
      setSearchResults([]);
      return;
    }

    setSearchText(searchText);

    //Set timeout to avoid sending too many requests
    const timeout = setTimeout(() => {
      const filteredPrompts = filterPrompts(searchText);
      setSearchResults(filteredPrompts);
    }, 500);
    setSearchTimeout(timeout);
  };

  const handleTagClick = (tag) => {
    console.log(tag);
    setSearchText(tag);
    const filteredPrompts = filterPrompts(tag);
    setSearchResults(filteredPrompts);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          placeholder="Search for a tag or a username"
          required
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
