export interface SuccessResponseType<T> {
  status: number;
  message: string;
  data: T;
}

export interface ErrorResponseType {
  status: number;
  message: string;
  error: {
    code: string;
    data?: unknown;
  };
}
