import { createGroq } from "@ai-sdk/groq";

const provider = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const model = provider("llama-3.3-70b-versatile");
