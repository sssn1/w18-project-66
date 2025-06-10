'use client';
import React, { useState, useEffect } from 'react';
import CartForm_xx from './cart';
import { getMyCart } from '@/lib/actions/cart.actions_66';

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type Promotion = {
  id: string;
  name: string;
  discountType: 'percent' | 'amount';
  discountValue: number;
};

const mockPromotions: Promotion[] = [
  { id: 'p1', name: '會員9折', discountType: 'percent', discountValue: 10 },
  { id: 'p2', name: '會員8.5折', discountType: 'percent', discountValue: 15 },
  { id: 'p3', name: '會員折10', discountType: 'amount', discountValue: 10 },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promotions] = useState<Promotion[]>(mockPromotions);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getMyCart();
        setCart(result?.items || []);
      } catch (e) {
        setCart([]); // 沒有購物車就顯示空
      }
    })();
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

  let finalTotal = total;
  if (selectedPromo) {
    if (selectedPromo.discountType === 'percent') {
      // 例如 10% off 就是 0.9
      finalTotal = total * (1 - selectedPromo.discountValue / 100);
    } else {
      finalTotal = Math.max(0, total - selectedPromo.discountValue);
    }
  }
  // 保留兩位小數
  finalTotal = Math.round(finalTotal * 100) / 100;

  const handleDecrease = async (itemId: string) => {
    const item = cart.find(i => i.id === itemId);
    const newQty = item ? item.qty - 1 : 0;

    await fetch('/api/cart/updateQty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, newQty }),
    });

    // 重新撈 cart
    try {
      const result = await getMyCart();
      setCart(result?.items || []);
    } catch {
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a1128]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-0 overflow-hidden">
        <div className="px-8 py-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">結帳畫面</h2>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">購物車內容</h3>
            <ul className="divide-y divide-gray-200 mb-2">
              {cart.map(item => (
                <li key={item.id} className="py-2 flex justify-between items-center text-gray-800">
                  <div>
                    {item.name} x {item.qty}
                    <button
                      className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleDecrease(item.id)}
                    >-</button>
                  </div>
                  <span className="font-semibold">${(Number(item.price) * Number(item.qty)).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-base font-medium mt-2">
              <span className="text-gray-700">原始金額：</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">會員專屬優惠</h3>
            <select
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
              value={selectedPromo?.id || ''}
              onChange={e => {
                const promo = promotions.find(p => p.id === e.target.value) || null;
                setSelectedPromo(promo);
              }}
            >
              <option value="">不使用優惠</option>
              {promotions.map(promo => (
                <option key={promo.id} value={promo.id}>
                  {promo.name}
                </option>
              ))}
            </select>
            <div className="flex justify-between text-base font-bold mt-4 bg-green-50 rounded px-3 py-2">
              <span className="text-gray-700">優惠後金額：</span>
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
          {/* 結帳表單 */}
          <CartForm_xx />
        </div>
      </div>
    </div>
  );
}