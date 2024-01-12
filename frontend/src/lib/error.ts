import { SafeParseReturnType, ZodError } from 'zod';

export function throwErrorIfParseUnsuccessful(
  input: SafeParseReturnType<any, any>,
) {
  if (!input.success) {
    throw Error(joinIssueMessages(input.error));
  }
}

export function joinIssueMessages(error: ZodError) {
  return error.issues.map((issue) => issue.message).join(' ');
}
