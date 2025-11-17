import "dotenv/config"; // Carrega o .env
import { geminiApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { ApiClient, FetchOptions, question } from "../../fetch";
import { GeminiApiResponse } from "./types";

export const startChat = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERRO: API KEY não encontrada no .env");
    rl.close();
    return;
  }

  const userPrompt = await question("O que você quer me perguntar? ");

  const model = "gemini-2.0-flash";
  const fetchUrl = `${geminiApiBaseUrl}/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: userPrompt,
          },
        ],
      },
    ],
  };

  const options: FetchOptions = {
    method: "POST",
    body: requestBody,
  };

  console.log("\nPensando...");

  try {
    const data = await ApiClient.request<GeminiApiResponse>(fetchUrl, options);

    if (data.candidates && data.candidates.length > 0) {
      const res = data.candidates[0].content.parts[0].text;
      console.log("\n✨ Gemini:\n", res);
    } else {
      console.error("Erro: A API não retornou uma resposta válida.", data);
    }
  } catch (error: any) {
    console.error("\nErro ao chamar a API do Gemini:", error.message);
  } finally {
    rl.close();
  }
};
