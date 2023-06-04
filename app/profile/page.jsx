"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { deletePost, fetchUserPosts } from "@utils/APIrequests";
import { routs } from "@utils/routs";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`${routs.updatePrompt}?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const resp = await deletePost(post._id);
        console.log(resp.status);
        if (resp.ok) {
          const filteredPosts = posts.filter((p) => p._id !== post._id);
          setPosts(filteredPosts);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (status === "authenticated") {
        try {
          const resp = await fetchUserPosts(session?.user.id);
          if (resp.ok) {
            const posts = await resp.json();
            setPosts(posts);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
    34;
  }, [status]);

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
