import { HttpClient } from "../../../lib/http-client";
import { question } from "../../question";

export class ExchangeService {
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getAllCoins() {
    const endpoint = `/cambio/v1/moedas`;
    try {
      const res = await this.httpClient.get(endpoint);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  public async getPriceBasedOnDate() {
    const coin = await question("Ex: BRL, USD... etc\nDigite uma moeda: ");
    const date = await question("Ex: 16/11/2025\nDigite uma data: ");

    const endpoint = `/cambio/v1/cotacao/${coin}/${date}`;

    try {
      const res = await this.httpClient.get(endpoint);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
}
