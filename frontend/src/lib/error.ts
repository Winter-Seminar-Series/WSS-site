import { ZodError } from 'zod';

export function joinIssueMessages(error: ZodError) {
  return error.issues.map((issue) => issue.message).join(', ');
}
