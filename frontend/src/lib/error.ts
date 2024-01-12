import { SafeParseReturnType, ZodError } from 'zod';

export function cleanSafeParseData<SuccessType, ErrorType>(input: SafeParseReturnType<SuccessType, ErrorType>) {
  if (!input.success) {
    // @ts-ignore
    throw Error(joinIssueMessages(input.error));
  }
  return input.data;
}

export function joinIssueMessages(error: ZodError) {
  return error.issues.map((issue) => issue.message).join(' ');
}
