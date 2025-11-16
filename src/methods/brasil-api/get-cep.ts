import { brasilApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { question, ApiClient } from "../../fetch";

// that api have two versions: v1 and v2

/**
 * so use the method like this:
 * cep("v1") or cep("v2")
 */

export const cep = async (version: string) => {
  const cep = await question("Digite um cep: ");

  console.log("\n searching for:", cep);

  const fetchUrl = `${brasilApiBaseUrl}/cep/${version}/${cep}`;

  try {
    const cep = await ApiClient.request(fetchUrl, { method: "GET" });
    console.log("\nResultado:\n", cep);
  } catch (error: any) {
    console.error("\nErro ao buscar:", error.message);
  }

  rl.close();
};
