export interface ApiResponseData<T> {
  statusCode: number;
  result: T;
}

export interface DefaultData {
  message: string;
}
