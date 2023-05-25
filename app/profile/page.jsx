"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";
import { fetchUserPosts } from "@utils/APIrequests";
import { routs } from "@utils/routs";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`${routs.updatePrompt}?id=${post._id}`);
  };

  const handleDelete = async (post) => {};

  useEffect(() => {
    if (session?.user.id) {
      (async () => {
        const posts = await fetchUserPosts(session?.user.id);
        setPosts(posts);
      })();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
