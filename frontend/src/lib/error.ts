import { z, ZodError, ZodRawShape } from 'zod';

export function cleanInput<InputType extends ZodRawShape>(
  FormSchema: z.ZodObject<InputType>,
  formData: FormData | z.infer<typeof FormSchema>,
): { cleanedInput: any; errorMessage: string } {
  // @ts-ignore
  const input = FormSchema.safeParse(Object.fromEntries(formData.entries()));

  let errorMessage: string | undefined, cleanedInput: any;
  if (input.success) {
    cleanedInput = input.data;
  } else {
    // @ts-ignore
    errorMessage = joinIssueMessages(input.error);
  }

  return { cleanedInput, errorMessage };
}

export function joinIssueMessages(error: ZodError) {
  return error.issues.map((issue) => issue.message).join(' ');
}
