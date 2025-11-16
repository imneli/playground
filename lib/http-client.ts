export class HttpClient {
  private readonly _baseUrl?: string;

  constructor(baseUrl?: string) {
    this._baseUrl = baseUrl;
  }

  private buildUrl(url: string): string {
    if (!this._baseUrl) return url;
    return `${this._baseUrl}${url}`;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(this.buildUrl(url), {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  }

  public async get<T>(
    url: string,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return await this.request<T>(url, {
      method: "GET",
      headers: options?.headers,
    });
  }

  public async post<T>(
    url: string,
    body?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return await this.request<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: options?.headers,
    });
  }

  public async put<T>(
    url: string,
    body?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return await this.request<T>(url, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      headers: options?.headers,
    });
  }

  public async delete<T>(
    url: string,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return await this.request<T>(url, {
      method: "DELETE",
      headers: options?.headers,
    });
  }
}