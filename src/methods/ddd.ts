import { baseUrl } from "../../common/baseUrl";
import { rl } from "../../common/rl";
import { question, Scripts } from "../../fetch";

export const dddMethod = async () => {
  const ddd = await question(
    "Digite um DDD e vou retornar uma lista de cidades: "
  );

  console.log("\n searching cities for:", ddd);

  const fetchUrl = `${baseUrl}/ddd/v1/${ddd}`;

  try {
    const cidades = await Scripts.fetchScript(fetchUrl, "GET");
    console.log("\nResultado:\n", cidades);
  } catch (error: any) {
    console.error("\nErro ao buscar cidades:", error.message);
  }

  rl.close();
};

dddMethod();
