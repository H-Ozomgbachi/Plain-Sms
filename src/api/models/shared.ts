export interface ApiResponseData<T> {
  statusCode: number;
  result: T;
}

export interface PagedResult<T> {
  numberOfRecords: number;
  totalNumberOfRecords: number;
  result: T[];
}

export interface QueryParam {
  PageNumber: number;
  Code: string;
  RecipientNumber: string;
  StartDate: Date;
  EndDate: Date;
  PageSize: number;
}

export interface DefaultData {
  message: string;
}

export interface RedirectTo {
  to: string;
}
