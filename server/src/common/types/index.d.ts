export type Role = 'ADMIN' | 'ACADEMY' | 'STUDENT';

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T | null;
  error?: {
    code: string;
    statusCode: number;
    fields?: { field: string; message: string }[];
  };
};
