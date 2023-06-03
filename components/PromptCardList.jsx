import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <ul className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default PromptCardList;
