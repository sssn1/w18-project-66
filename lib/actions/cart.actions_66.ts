'use server';

import { cookies } from 'next/headers';
import { CartItem } from '@/types';
import { convertToPlainObject, formatError, round2 } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { Prisma } from '@prisma/client';
import { cartItemSchema, insertCartSchema } from '../validator';
import { revalidatePath } from 'next/cache';
import { Decimal } from '@prisma/client/runtime/binary';
import { randomUUID } from 'crypto';
// import { updateCartItemQty } from '@/lib/actions/cart.actions_66';

// Calculate cart price
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  console.log('Adding item to cart:', data);
  try {
    const cookieStore = await cookies();

    // 為每個商品生成一個唯一的 cookie 名稱
    const uniqueCookieName = `cartItem_${randomUUID()}`;

    // 將商品資料存入新的 cookie
    cookieStore.set(uniqueCookieName, JSON.stringify(data), {
      path: '/', // Cookie 的作用域
      httpOnly: false, // 允許客戶端訪問
      sameSite: 'lax', // 防止跨站請求偽造
      maxAge: 60 * 60 * 24 * 7, // 7 天有效期
    });

    return { success: true, message: 'Item added to cart' };
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return { success: false, message: formatError(error) };
  }
}

export async function getMyCart() {
  const sessionCardId = (await cookies()).get('sessionCartId')?.value;
  console.log('Session Cart ID:', sessionCardId);

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;
  console.log('User ID:', userId);

 if (!sessionCardId && !userId) {
  throw new Error('Cart session or user ID not found');
}

const cart = await prisma.cart.findFirst({
  where: userId ? { userId: userId } : { sessionCartId: sessionCardId },
});

  console.log('Cart Found:', cart);

  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function checkoutCart(formData: any) {
  // 這裡寫你的結帳邏輯
  return { success: true, message: '結帳成功' };
}

export async function updateCartItemQty(itemId: string, newQty: number) {
  const cookieStore = await cookies();
  const sessionCartId = cookieStore.get('sessionCartId')?.value;
  if (!sessionCartId) return { success: false, message: 'No cart session' };

  const cart = await prisma.cart.findFirst({
    where: { sessionCartId },
  });
  if (!cart) return { success: false, message: 'Cart not found' };

  let items = Array.isArray(cart.items) ? [...cart.items] : [];
  const idx = items.findIndex((i: any) => i.id === itemId);
  if (idx === -1) return { success: false, message: 'Item not found' };

  if (newQty <= 0) {
    items.splice(idx, 1); // 移除商品
  } else {
    items[idx].qty = newQty; // 更新商品數量
  }

  const priceObj = calcPrice(items);

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: items,
      itemsPrice: new Decimal(priceObj.itemsPrice),
      shippingPrice: new Decimal(priceObj.shippingPrice),
      taxPrice: new Decimal(priceObj.taxPrice),
      totalPrice: new Decimal(priceObj.totalPrice),
    },
  });

  return { success: true, message: 'Item updated successfully' };
}

