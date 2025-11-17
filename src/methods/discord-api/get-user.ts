import { discordApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { question } from "../../fetch";
import { HttpClient } from "../../../lib/http-client";
import "dotenv/config";

export class DiscordUserService {
  private readonly token: string | undefined;

  private readonly httpClient: HttpClient;

  constructor() {
    this.token = process.env.TOKEN;

    this.httpClient = new HttpClient(discordApiBaseUrl);

    if (!this.token) {
      console.error("### ERRO: token nao encontrado no .env");
    }
  }

  public async getUser() {
    if (!this.token) {
      console.error("### ERRO: O serviço não pode operar sem um token.");
      rl.close();
      return;
    }

    try {
      const id = await question("Digite um Id de usuário: ");
      console.log("\n searching user for:", id);

      const endpoint = `/users/${id}`;

      const headers = {
        Authorization: `Bot ${this.token}`,
      };

      const user = await this.httpClient.get(endpoint, {
        headers: headers,
      });

      console.log("\nresult:\n", user);
    } catch (error: any) {
      console.error("\nErro ao buscar user:", error.message);
    } finally {
      rl.close();
    }
  }
}
