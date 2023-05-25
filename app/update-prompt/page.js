"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { createPost } from "@utils/APIrequests";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
    };
  }, [promptId]);

  // const createPrompt = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);

  //   try {
  //     const response = await createPost(post, session?.user.id);

  //     if (response.ok) {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.log("Create prompt error: ", error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      // handleSubmit={createPrompt}
    />
  );
};

UpdatePrompt;
