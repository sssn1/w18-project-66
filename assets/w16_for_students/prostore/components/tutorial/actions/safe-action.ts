import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { ZodError } from 'zod';
import {
  DATABASE_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from './safe-action-helpers';
import { authenticationMiddleware } from './middleware/authentication.middleware';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient, Prisma } from '@/lib/generated/prisma';

const prisma = new PrismaClient().$extends(withAccelerate());

// Base client which has server error handling, and metadata
export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof ZodError) {
      console.error(e.message);
      return VALIDATION_ERROR_MESSAGE;
    } else if (
      e instanceof Prisma.PrismaClientInitializationError ||
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientUnknownRequestError ||
      e instanceof Prisma.PrismaClientValidationError
    ) {
      console.error(e.message);
      return DATABASE_ERROR_MESSAGE;
    } else if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient
  // Authentication
  .use(authenticationMiddleware);
