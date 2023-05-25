import Prompt from "@app/(server)/models/prompt";
import { addHash } from "@app/(server)/utils/addHash";
import { connectToDB } from "@app/(server)/utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  const newTag = addHash(tag);

  try {
    connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag: newTag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status: 500,
    });
  }
};
