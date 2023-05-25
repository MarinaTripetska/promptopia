export const fetchPosts = async () => {
  const response = await fetch("/api/prompt");
  const data = await response.json();
  return data;
};

export const fetchUserPosts = async (userId) => {
  const response = await fetch(`/api/users/${userId}/posts`);
  return response;
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

export const getPost = async (id) => {
  const response = await fetch(`/api/prompt/${id}`);
  return response;
};

export const updatePost = async (post, id) => {
  const response = await fetch(`/api/prompt/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      prompt: post.prompt,
      tag: post.tag,
    }),
  });
  return response;
};

export const deletePost = async (id) => {
  const response = await fetch(`/api/prompt/${id}`, {
    method: "DELETE",
  });
  return response;
};
