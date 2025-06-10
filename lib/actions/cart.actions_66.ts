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
    let sessionCartId = cookieStore.get('sessionCartId')?.value;

    if (!sessionCartId) {
      sessionCartId = randomUUID();
      cookieStore.set('sessionCartId', sessionCartId, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7天
      });
    }

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    console.log({
      'Session CartId': sessionCartId,
      'User Id': userId,
      'Item Request': item,
      'Product Found': product,
      'Cart Found': cart,
    });

    if (!product) throw new Error('Product not found');

    if (!cart) {
      // 新增購物車
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      console.log({ 'New Cart': newCart });
      await prisma.cart.create({
        data: {
          ...newCart,
          itemsPrice: new Decimal(newCart.itemsPrice),
          shippingPrice: new Decimal(newCart.shippingPrice),
          taxPrice: new Decimal(newCart.taxPrice),
          totalPrice: new Decimal(newCart.totalPrice),
        },
      });

      await revalidatePath(`/product/${product.slug}`);
    } else {
      // 購物車已存在，合併商品
      let items = Array.isArray(cart.items) ? [...cart.items] : [];
      const existIdx = items.findIndex((i: CartItem) => i.productId === item.productId);

      if (existIdx > -1) {
        // 已存在則數量相加
        items[existIdx].qty += item.qty;
      } else {
        items.push(item);
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

      await revalidatePath(`/product/${product.slug}`);
    }
    return { success: true, message: 'Item added to cart' };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getMyCart() {
  const sessionCardId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCardId) throw new Error('Cart session not found');

  // Get session and use ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCardId },
  });

  if (!cart) return undefined;

  // Convert decimal and return
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
    items.splice(idx, 1);
  } else {
    items[idx].qty = newQty;
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

  return { success: true };
}

