import { HttpClient } from "../../../lib/http-client";
import { question } from "../../question";

export class RegistroBrService {
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getDomainInfo() {
    const input = await question("digite um dominio: ");
    const endpoint = `/registrobr/v1/${input}`;

    try {
      const res = await this.httpClient.get(endpoint);
      console.log("Resultado:", res);
    } catch (err) {
      console.error(err);
    }
  }
}
