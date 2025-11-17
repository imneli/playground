import { rl } from "../../../common/rl";
import { HttpClient } from "../../../lib/http-client";
import { question } from "../../question";
import { GeminiApiResponse, ListModelsResponse } from "../../types/gemini/types";

export class GeminiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly apiKey = process.env.GEMINI_API_KEY
  ) {
    this.apiKey = apiKey;
  }

  public async startChat() {
    if (!this.apiKey) {
      console.error("ERRO: API KEY não encontrada no .env");
      rl.close();
      return;
    }

    const userPrompt = await question("O que você quer me perguntar? ");

    const model = "gemini-2.0-flash";
    const fetchUrl = `/v1beta/models/${model}:generateContent?key=${this.apiKey}`;

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

    const options = {
      body: requestBody,
    };

    console.log("\nPensando...");

    try {
      const data = await this.httpClient.post<GeminiApiResponse>(fetchUrl, {
        options,
      });

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
  }

  public async listModels() {
    if (!this.apiKey) {
      console.error("ERRO: GEMINI_API_KEY não encontrada no .env");
      rl.close();
      return;
    }

    const endpoint = `/v1beta/models?key=${this.apiKey}`;

    console.log("Buscando modelos disponíveis na sua conta...");

    try {
      const data = await this.httpClient.get<ListModelsResponse>(endpoint);

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
  }
}
