import { brasilApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { HttpClient } from "../../../lib/http-client";
import { question } from "../../fetch";

export class BanksService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(brasilApiBaseUrl);
  }

  public async banks() {
    const fetchUrl = `/banks/v1`;

    try {
      const banks = await this.httpClient.get(fetchUrl);
      console.log("\nResultado:\n", banks);
    } catch (error: any) {
      console.error("\n error to search banks:", error.message);
    }

    rl.close();
  }

  public async bankByCode() {
    const code = await question("Digite um código de banco: ");

    console.log("\n searching for:", code);

    const fetchUrl = `/banks/v1/${code}`;

    try {
      const bank = await this.httpClient.get(fetchUrl);
      console.log("\nResultado:\n", bank);
    } catch (error: any) {
      console.error("\nErro ao buscar banco:", error.message);
    }

    rl.close();
  }
}
