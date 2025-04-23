// Importing the HfInference class from Hugging Face's inference library
import { HfInference } from "@huggingface/inference";

// Creating an instance of HfInference with the Hugging Face access token from environment variables
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

// Defining a system prompt that instructs the AI on how to respond
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

// Asynchronous function to get a recipe based on the provided ingredients
export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    // Making a chat completion request to the Hugging Face model
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Specifying the model to use
      messages: [
        { role: "system", content: SYSTEM_PROMPT }, // Sending the system prompt
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`, // User message with the ingredients
        },
      ],
      max_tokens: 1024, // Setting the maximum number of tokens for the response
    });
    return response.choices[0].message.content; // Returning the generated recipe content
  } catch (err) {
    console.error(err.message);
    return "Sorry, I couldn't generate a recipe at this time."; // Returning a fallback message in case of an error
  }
}
