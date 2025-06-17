'use client';
import React, { useState, useEffect } from 'react';
import CartForm_xx from './cart';
import { updateCartItemQty } from '@/lib/actions/cart.actions_66'; // 正確導入函數

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type Promotion = {
  id: string;
  name: string;
  discountType: 'percent';
  discountValue: number;
};

const mockPromotions: Promotion[] = [
  { id: 'p1', name: '會員9折', discountType: 'percent', discountValue: 10 },
  { id: 'p2', name: '會員8.5折', discountType: 'percent', discountValue: 15 },
  { id: 'p3', name: '會員折10', discountType: 'amount', discountValue: 10 },
];

// 讀取所有以 `cartItem_` 開頭的 cookie
const getCartFromCookies = (): CartItem[] => {
  const cookies = document.cookie.split('; ');
  const cartItems: CartItem[] = [];

  cookies.forEach(cookie => {
    if (cookie.startsWith('cartItem_')) {
      try {
        const item = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
        cartItems.push(item);
      } catch (error) {
        console.error('Error parsing cookie:', error);
      }
    }
  });

  return cartItems;
};

// 新增商品時生成新的 cookie
const addItemToCart = (item: CartItem) => {
  const uniqueCookieName = `cartItem_${item.id}`;
  document.cookie = `${uniqueCookieName}=${encodeURIComponent(JSON.stringify(item))}; path=/; max-age=${60 * 60 * 24 * 7}`;
};

// 刪除指定的 cookie
const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; path=/; max-age=0`;
};

// 完全移除商品
const handleRemoveItem = async (itemId: string, setCart: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
  const sessionCartId = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionCartId='))?.split('=')[1];

  if (!sessionCartId) {
    alert('No cart session. Please add items to your cart first.');
    return;
  }

  try {
    const response = await updateCartItemQty(itemId, 0); // 將商品數量設為 0，觸發移除邏輯
    if (response.success) {
      setCart(getCartFromCookies()); // 更新 React 狀態
    } else {
      console.error(response.message);
      alert(response.message); // 顯示錯誤訊息給用戶
    }
  } catch (error) {
    console.error('Error removing item:', error);
    alert('Failed to remove item. Please try again.');
  }
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promotions] = useState<Promotion[]>(mockPromotions);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  useEffect(() => {
    setCart(getCartFromCookies());
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

  let finalTotal = total;
  if (selectedPromo) {
    if (selectedPromo.discountType === 'percent') {
      finalTotal = total * (1 - selectedPromo.discountValue / 100);
    } else {
      finalTotal = Math.max(0, total - selectedPromo.discountValue);
    }
  }
  finalTotal = Math.round(finalTotal * 100) / 100;

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
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-4">${(Number(item.price) * Number(item.qty)).toFixed(2)}</span>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleRemoveItem(item.id, setCart)}
                    >
                      移除
                    </button>
                  </div>
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
          <CartForm_xx />
        </div>
      </div>
    </div>
  );
}