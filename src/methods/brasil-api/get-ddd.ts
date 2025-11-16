import { brasilApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { question, ApiClient } from "../../fetch";

export const dddMethod = async () => {
  const ddd = await question(
    "Digite um DDD e vou retornar uma lista de cidades: "
  );

  console.log("\n searching cities for:", ddd);

  const fetchUrl = `${brasilApiBaseUrl}/ddd/v1/${ddd}`;

  try {
    const cities = await ApiClient.request(fetchUrl, { method: "GET" });
    console.log("\nResultado:\n", cities);
  } catch (error: any) {
    console.error("\nErro ao buscar cidades:", error.message);
  }

  rl.close();
};

dddMethod();
