export const fetchPosts = async () => {
  const response = await fetch("/api/prompt");
  const data = await response.json();
  return data;
};

export const createPost = async (post, id) => {
  const response = await fetch("/api/prompt/new", {
    method: "POST",
    body: JSON.stringify({
      prompt: post.prompt,
      userId: id,
      tag: post.tag,
    }),
  });
  return response;
};
