import { rl } from "../../../common/rl";
import { HttpClient } from "../../../lib/http-client";
import { question } from "../../question";

export class BanksService {
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getBanks() {
    const endpoint = `/banks/v1`;

    try {
      const input = await this.httpClient.get(endpoint);
      console.log("\nResultado:\n", input);
    } catch (error: any) {
      console.error("\n error to search banks:", error.message);
    }

    rl.close();
  }

  public async getBankByCode() {
    const input = await question("Digite um código de banco: ");

    console.log("\n searching for:", input);

    const endpoint = `/banks/v1/${input}`;

    try {
      const bank = await this.httpClient.get(endpoint);
      console.log("\nResultado:\n", bank);
    } catch (error: any) {
      console.error("\nErro ao buscar banco:", error.message);
    }

    rl.close();
  }
}
