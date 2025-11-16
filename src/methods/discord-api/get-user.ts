import { discordApi } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { question, Scripts } from "../../fetch";
import "dotenv/config";

const token = process.env.TOKEN;

export const getUser = async () => {
  const id = await question("Digite um Id de usuário: ");

  console.log("\n searching user for:", id);

  const fetchUrl = `${discordApi}/users/${id}`;

  if (!token) {
    console.error("### ERRO: token nao encontrado");
    rl.close();
    return;
  }

  const headers = {
    Authorization: `Bot ${token}`,
  };

  try {
    const user = await Scripts.fetchScript(fetchUrl, {
      method: "GET",
      headers: headers,
    });
    console.log("\nresult:\n", user);
  } catch (error: any) {
    console.error("\nErro ao buscar user:", error.message);
  }

  rl.close();
};
