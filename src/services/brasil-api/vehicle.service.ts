import { HttpClient } from "../../../lib/http-client";
import { question } from "../../question";

export class VehicleService {
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getVehiclePrice() {
    const input = await question("Digite um tipo de veículo:");
    const endpoint = `/fipe/preco/v1/${input}`;

    try {
      const res = this.httpClient.get(endpoint);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  public async getVehiclesByBrandAndType() {
    const brandInput = await question("Digite a marca de um veículo: ");
    const typeInput = await question("Digite o tipo de um veículo: ");

    const endpoint = `/fipe/veiculos/v1/${typeInput}/${brandInput}`;

    try {
      const res = this.httpClient.get(endpoint);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
}
