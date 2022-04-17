export interface RequestHeadersState extends Headers {
  'Authorization'?: string;
}

export interface RequestParamsState {
  body?: string;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  headers?: RequestHeadersState;
}