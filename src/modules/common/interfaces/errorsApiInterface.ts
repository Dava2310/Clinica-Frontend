export interface ApiError {
  response?: {
    data?: {
      statusCode?: number;
      body?: {
        message?: string;
      };
    };
  };
}