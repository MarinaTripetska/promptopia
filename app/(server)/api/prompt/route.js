import Prompt from "@app/(server)/models/prompt";
import { connectToDB } from "@app/(server)/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    new Response("Failed to fetch all prompts", { status: 500 });
  }
};
