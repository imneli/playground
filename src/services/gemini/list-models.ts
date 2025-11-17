import "dotenv/config";
import { geminiApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { ApiClient, FetchOptions } from "../../fetch";

interface GeminiModel {
  name: string;
  displayName: string;
  description: string;
  version: string;
}

interface ListModelsResponse {
  models: GeminiModel[];
}

export const listModels = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERRO: GEMINI_API_KEY não encontrada no .env");
    rl.close();
    return;
  }

  const fetchUrl = `${geminiApiBaseUrl}/v1beta/models?key=${apiKey}`;

  const options: FetchOptions = {
    method: "GET",
  };

  console.log("🔍 Buscando modelos disponíveis na sua conta...");

  try {
    const data = await ApiClient.request<ListModelsResponse>(fetchUrl, options);

    if (data.models && data.models.length > 0) {
      console.log("Modelos encontrados! Use um desses no seu 'chat.ts':\n");
      data.models.forEach((model) => {
        console.log(`- ${model.name}`);
      });
    } else {
      console.log("Nenhum modelo encontrado. Isso é estranho.");
    }
  } catch (error: any) {
    console.error("\nErro ao listar modelos:", error.message);
  } finally {
    rl.close();
  }
};
