import { z, ZodError, ZodRawShape } from 'zod';

function cleanParsedInput(parsedInput: any) {
  let errorMessage: string | undefined, cleanedInput: any;
  if (parsedInput.success) {
    cleanedInput = parsedInput.data;
  } else {
    // @ts-ignore
    errorMessage = joinIssueMessages(parsedInput.error);
  }

  return { cleanedInput, errorMessage };
}

export function cleanInput<InputType extends ZodRawShape>(
  FormSchema: z.ZodObject<InputType>,
  input: z.infer<typeof FormSchema>,
): { cleanedInput: any; errorMessage: string } {
  const parsedInput = FormSchema.safeParse(input);

  return cleanParsedInput(parsedInput);
}

export function cleanFormData<InputType extends ZodRawShape>(
  FormSchema: z.ZodObject<InputType>,
  formData: FormData,
): { cleanedInput: any; errorMessage: string } {
  const parsedInput = FormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  return cleanParsedInput(parsedInput);
}

export function joinIssueMessages(error: ZodError) {
  return error.issues.map((issue) => issue.message).join(' ');
}
