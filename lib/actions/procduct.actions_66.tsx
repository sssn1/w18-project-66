'use server';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@/lib/generated/prisma/client';

import { convertToPlainObject } from '@/lib/utils';
// import { LATEST_PRODUCTS_LIMIT } from '../constants';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function getLatestProducts_66() {
  const data = await prisma.product.findMany({
    // take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}