'use server';

import { authActionClient } from '../safe-action';
import { nameSchema } from '@/components/tutorial/schema';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@/lib/generated/prisma';
const prisma = new PrismaClient().$extends(withAccelerate());
import { revalidatePath } from 'next/cache';

export const updateNameAction = authActionClient
  .schema(nameSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { session } = ctx;
    const { name } = parsedInput;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    revalidatePath('/forms/4');
  });
