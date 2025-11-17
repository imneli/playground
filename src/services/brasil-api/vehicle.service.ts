import { HttpClient } from "../../../lib/http-client";
import { question } from "../../question";

export class VehicleService {
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getVehiclePrice() {
    const input = await question("digite um tipo de veiculo:");
    const endpoint = `/fipe/preco/v1/${input}`;

    try {
      const res = this.httpClient.get(endpoint);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  public async getVehiclesByBrandAndType() {
    const brandInput = await question("type a vehicle brand: ");
    const typeInput = await question("type a type of vehicle: ");

    const endpoint = `/fipe/veiculos/v1/${typeInput}/${brandInput}`;

    try {
      const res = this.httpClient.get(endpoint);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
}
