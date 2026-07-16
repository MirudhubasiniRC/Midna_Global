export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions = {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: unknown;
  signal?: AbortSignal;
  /** Override the default timeout from env config */
  timeoutMs?: number;
};

export type HealthResponse = {
  status: string;
  service: string;
};

export type HelloResponse = {
  message: string;
};
