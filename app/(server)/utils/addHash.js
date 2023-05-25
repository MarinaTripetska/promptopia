export const addHash = (tag) => {
  const tagsArr = tag.split(" ");
  const tagsWithHash = tagsArr.map((tag) => {
    if (tag[0] === "#") {
      return tag;
    }
    return "#" + tag;
  });
  return tagsWithHash.join(" ");
};
