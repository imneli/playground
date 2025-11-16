import { brasilApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { question, ApiClient } from "../../fetch";

export const cnpj = async () => {
  const cnpj = await question("Digite um cnpj: ");

  console.log("\n searching for:", cnpj);

  const fetchUrl = `${brasilApiBaseUrl}/cnpj/v1/${cnpj}`;

  try {
    const cnpj = await ApiClient.request(fetchUrl, { method: "GET" });
    console.log("\nResultado:\n", cnpj);
  } catch (error: any) {
    console.error("\nErro ao buscar:", error.message);
  }

  rl.close();
};
