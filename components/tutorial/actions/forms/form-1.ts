'use server';

import { nameSchema } from '@/components/tutorial/schema';
import { z } from 'zod';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@/lib/generated/prisma';
const prisma = new PrismaClient().$extends(withAccelerate());

export async function updateName(values: z.infer<typeof nameSchema>) {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }
  console.log('session', session);
  console.log('values', values);
  const result = nameSchema.parse(values);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: result.name },
  });

  return { success: true };
}
