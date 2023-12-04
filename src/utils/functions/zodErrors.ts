import { ZodError } from 'zod';

function extractZodErrors(error: unknown): string[] {
  if (error instanceof ZodError) {
    return error.errors.map((err) => err.message);
  }
  return [];
}


export default extractZodErrors;
