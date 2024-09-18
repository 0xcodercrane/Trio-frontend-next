export function isSuccess(statusCode: number) {
  return statusCode > 199 && statusCode < 400;
}
