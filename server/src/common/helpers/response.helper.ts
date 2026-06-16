import { ApiResponse } from '../types';

export const successResponse = <T>({
  message,
  data,
}: {
  message?: string;
  data?: T | null;
}): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const errorResponse = ({
  message,
  code,
  statusCode,
  fields,
}: {
  message?: string;
  code: string;
  statusCode: number;
  fields?: { field: string; message: string }[];
}): ApiResponse<never> => ({
  success: false,
  message,
  error: { code, statusCode, fields },
});
