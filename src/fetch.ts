import { rl } from "../common/rl";
import { HttpClient } from "../lib/http-client";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type MethodKey = Lowercase<HttpMethod>;

export const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

export interface FetchOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
}

export class Scripts {
  private static _httpClient = new HttpClient();

  public static async fetchScript<T>(
    url: string,
    options: FetchOptions
  ): Promise<T> {
    
    const m: MethodKey = options.method.toLowerCase() as MethodKey;
    const { headers, body } = options;

    switch (m) {
      case "get":
        return await this._httpClient.get(url, { headers });

      case "post":
        return await this._httpClient.post(url, body, { headers });

      case "put":
        return await this._httpClient.put(url, body, { headers });

      case "delete":
        return await this._httpClient.delete(url, { headers });

      default:
        throw new Error(`Método HTTP desconhecido: ${options.method}`);
    }
  }
}