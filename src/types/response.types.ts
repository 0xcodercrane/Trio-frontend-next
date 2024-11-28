type GenericResponseSuccess<TPayload> = {
  success: true;
  payload: TPayload;
};

type GenericResponseError = {
  success: false;
  error: string;
};

export type GenericResponse<TPayload> = GenericResponseSuccess<TPayload> | GenericResponseError;

export function isResponseSuccess<TPayload>(
  response: GenericResponse<TPayload>
): response is GenericResponseSuccess<TPayload> {
  return response.success;
}

export function isResponseError<TPayload>(response: GenericResponse<TPayload>): response is GenericResponseError {
  return !response.success;
}
