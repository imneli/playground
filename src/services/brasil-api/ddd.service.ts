import { question } from "../../question";
import { HttpClient } from "../../../lib/http-client";

export class DddService {
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getDdd() {
    const input = await question("type a ddd:");
    const endpoint = `/ddd/v1/${input}`;

    try {
      const res = await this.httpClient.get(endpoint);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
}
