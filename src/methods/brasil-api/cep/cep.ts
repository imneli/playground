import { brasilApi } from "../../../../common/baseUrls";
import { rl } from "../../../../common/rl";
import { question, Scripts } from "../../../fetch";

// that api have two versions: v1 and v2

/**
 * so use the method like this:
 * cep("v1") or cep("v2")
 */

export const cep = async (version: string) => {
  const cep = await question("Digite um cep: ");

  console.log("\n searching for:", cep);

  const fetchUrl = `${brasilApi}/cep/${version}/${cep}`;

  try {
    const cep = await Scripts.fetchScript(fetchUrl, { method: "GET" });
    console.log("\nResultado:\n", cep);
  } catch (error: any) {
    console.error("\nErro ao buscar banco:", error.message);
  }

  rl.close();
};
