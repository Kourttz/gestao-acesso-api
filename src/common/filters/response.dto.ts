
export class ResponseDto<T> {
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  data?: T;
}
