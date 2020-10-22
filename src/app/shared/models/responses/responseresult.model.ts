export interface ResponseResult<T> {
  data: T;
  message?: string;
  redirect?: string;
  errors?: any;
}