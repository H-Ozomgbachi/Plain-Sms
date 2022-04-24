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
  pageNumber?: number;
  code?: string;
  recipientNumber?: string;
  startDate: string;
  endDate: string;
  pageSize: number;
}

export interface DefaultData {
  message: string;
}

export interface RedirectTo {
  to: string;
}
export interface IsUpdated {
  isUpdated: boolean;
}
