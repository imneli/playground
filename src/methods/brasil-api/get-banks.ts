import { brasilApiBaseUrl } from "../../../common/baseUrls";
import { rl } from "../../../common/rl";
import { ApiClient } from "../../fetch";

export const banks = async () => {
  const fetchUrl = `${brasilApiBaseUrl}/banks/v1`;

  try {
    const banks = await ApiClient.request(fetchUrl, { method: "GET" });
    console.log("\nResultado:\n", banks);
  } catch (error: any) {
    console.error("\n error to search banks:", error.message);
  }

  rl.close();
};

banks();
