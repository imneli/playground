import { brasilApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { HttpClient } from "../../../lib/http-client";
import { question } from "../../question";

// that api have two versions: v1 and v2

/**
 * so use the service like this:
 * CepService.cep("v1") or cep("v2")
 */

export type CepApiVersion = "v1" | "v2";

export class CepService {
  private readonly httpClient: HttpClient;
  private readonly version: CepApiVersion;

  constructor(httpClient: HttpClient, version: CepApiVersion) {
    this.httpClient = httpClient;
    this.version = version;
  }

  public async getCep() {

    const inputCep = await question("Digite um cep: ");

    const fetchUrl = `/cep/${this.version}/${inputCep}`;

    try {
      const outputCepService = await this.httpClient.get(fetchUrl);
      console.log("\nResultado:\n", outputCepService);
    } catch (error: any) {
      console.error("\nErro ao buscar:", error.message);
    }

    rl.close();
  }
}
