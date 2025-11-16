import { rl } from "./common/rl";
import { HttpClient } from "./lib/http-client";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type MethodKey = Lowercase<HttpMethod>;

export const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

export class Scripts {
  private static _httpClient = new HttpClient();

  public static async fetchScript<T>(
    url: string,
    method: HttpMethod
  ): Promise<T> {
    const m: MethodKey = method.toLowerCase() as MethodKey;

    const methods: Record<MethodKey, Function> = {
      get: this._httpClient.get.bind(this._httpClient),
      post: this._httpClient.post.bind(this._httpClient),
      put: this._httpClient.put.bind(this._httpClient),
      delete: this._httpClient.delete.bind(this._httpClient),
    };

    return await methods[m](url);
  }
}
