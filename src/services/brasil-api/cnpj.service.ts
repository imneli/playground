import { rl } from "../../../common/rl";
import { HttpClient } from "../../../lib/http-client";
import { question } from "../../question";

export class CnpjService {
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getCpnj() {
    const input = await question("Digite um CNPJ:");
    const endpoint = `/cnpj/v1/${input}`;

    try {
      const output = await this.httpClient.get(endpoint);
      console.log("\nResultado:\n", output);
    } catch (error: any) {
      console.error("\nErro ao buscar:", error.message);
    }

    rl.close();
  }
}
