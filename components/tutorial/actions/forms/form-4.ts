'use server';

import { z } from 'zod';

import { formSchema } from '@/components/tutorial/schema';

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const handleFormAction = async (
  unsafeData: z.infer<typeof formSchema>
): Promise<{ error: boolean; message: string }> => {
  await wait(2000);
  const { success, data } = formSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true, message: 'Unable to parse the data' };
  }
  console.log(data);
  return { error: false, message: 'Success' };
};
