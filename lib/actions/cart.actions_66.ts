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
  // Simulate adding item to cart
  console.log('Adding item to cart:', data);
  try {
    // check for the cart cookie
    const sessionCardId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCardId) throw new Error('Cart session not found');

    // Get session and use ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    // testing
    console.log({
      'Session CartId': sessionCardId,
      'User Id': userId,
      'Item Request': item,
      'Product Found': product,
      'Cart Found': cart,
    });

    if (!product) throw new Error('Product not found');

    if (!cart) {
      // Create a new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCardId,
        ...calcPrice([item]),
        // itemsPrice: new Decimal(calcPrice([item]).itemsPrice),
        // shippingPrice: new Decimal(calcPrice([item]).shippingPrice),
        // taxPrice: new Decimal(calcPrice([item]).taxPrice),
        // totalPrice: new Decimal(calcPrice([item]).totalPrice),
      });

      console.log({ 'New Cart': newCart });
      // Add to database
      await prisma.cart.create({
        data: {
          ...newCart,
          itemsPrice: new Decimal(newCart.itemPrice),
          shippingPrice: new Decimal(newCart.shippingPrice),
          taxPrice: new Decimal(newCart.taxPrice),
          totalPrice: new Decimal(newCart.totalPrice),
        },
      });

      // Revalidate product page
      revalidatePath(`/product/${product.slug}`);
    }
    return { success: true, message: 'Item added to cart' };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }

  // Here you would typically call an API endpoint or a database function
  // to add the item to the user's cart.
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