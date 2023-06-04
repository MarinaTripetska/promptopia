"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/profile";
import { fetchUserPosts } from "@utils/APIrequests";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (params?.id) {
      (async () => {
        try {
          const response = await fetchUserPosts(params.id);

          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          const data = await response.json();

          setUserPosts(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
