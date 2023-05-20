"use client";
import { useState, useEffect } from "react";
import { fetchPosts } from "@utils/APIrequests";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      const posts = await fetchPosts();
      setPosts(posts);
    })();
  }, []);

  const handleSearchChange = (e) => {};

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
      {posts.length > 0 && (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
