import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <ul className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick && handleTagClick()}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </ul>
  );
};

export default PromptCardList;
