"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { routs } from "@utils/routs";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  // console.log("session: ", session);
  const pathName = usePathname();
  // console.log("path: ", pathName);
  const router = useRouter();
  // console.log("router: ", router);

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <li className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3">
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inner text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="copy_btn"
          title="copy a prompt"
          onClick={handleCopy}
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_prompt_icon"
            width={12}
            height={12}
          />
        </button>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700 ">{post.prompt}</p>
      <button
        type="button"
        className="font-inner text-sm blue_gradient"
        title="filter by a tag"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </button>

      {session?.user.id === post.creator._id && pathName === routs.profile && (
        <div className="mt-2 flex-center gap-4 border-t border-gray-100 pt-2">
          <button
            type="button"
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post)}
          >
            Edit
          </button>

          <button
            type="button"
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(post)}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default PromptCard;
