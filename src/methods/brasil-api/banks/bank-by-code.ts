import { brasilApi } from "../../../../common/baseUrls";
import { rl } from "../../../../common/rl";
import { question, Scripts } from "../../../fetch";

export const bankByCode = async () => {
  const code = await question("Digite um código de banco: ");

  console.log("\n searching for:", code);

  const fetchUrl = `${brasilApi}/banks/v1/${code}`;

  try {
    const bank = await Scripts.fetchScript(fetchUrl, { method: "GET" });
    console.log("\nResultado:\n", bank);
  } catch (error: any) {
    console.error("\nErro ao buscar banco:", error.message);
  }

  rl.close();
};

bankByCode();
