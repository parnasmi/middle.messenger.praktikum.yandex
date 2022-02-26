export interface IFormCallback {
  success?: (data?: any) => void;
  error?: (error: unknown) => void;
  finally?: () => void
}
