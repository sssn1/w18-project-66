'use server';

import { authActionClient } from '@/components/tutorial/actions/safe-action';
import { combinedFormSchema } from '@/components/tutorial/schema';
import { revalidatePath } from 'next/cache';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@/lib/generated/prisma';
const prisma = new PrismaClient().$extends(withAccelerate());

export const updateCombinedFormAction = authActionClient
  .schema(combinedFormSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { session } = ctx;
    const { name, ...formData } = parsedInput;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    // Log other form data (in a real app, you'd store this in the database)
    console.log('Form data:', formData);

    revalidatePath('/forms/3');
  });
