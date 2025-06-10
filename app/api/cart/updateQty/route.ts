import { NextRequest, NextResponse } from 'next/server';
import { updateCartItemQty } from '@/lib/actions/cart.actions_66';

export async function POST(req: NextRequest) {
  const { itemId, newQty } = await req.json();
  const result = await updateCartItemQty(itemId, newQty);
  return NextResponse.json(result);
}