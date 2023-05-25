import Prompt from "@app/(server)/models/prompt";
import { connectToDB } from "@app/(server)/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    new Response("Failed to fetch user's prompts", { status: 500 });
  }
};
