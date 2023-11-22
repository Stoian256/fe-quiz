export interface Message {
  text: string;
}
export interface AppError {
  message: string;
}
export interface ApiResponse {
  data: Message | null;
  error: AppError | null;
}