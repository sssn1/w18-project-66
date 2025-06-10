'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { checkoutCart } from '@/lib/actions/cart.actions_66';

interface FormData {
  success: boolean;
  message: string;
}

const cartDefaultValues = {
  name: '',
  address: '',
  phone: '',
};

const CheckoutButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className='w-full' variant='default'>
      {pending ? '結帳中...' : '確認結帳'}
    </Button>
  );
};

const CartForm_xx = () => {
  const [data, action] = useActionState<FormData>(checkoutCart, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="max-w-md mx-auto">
      <form action={action} className="space-y-6">
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        <div>
          <Label htmlFor='name' className="text-gray-800">收件人姓名</Label>
          <Input
            id='name'
            name='name'
            type='text'
            required
            autoComplete='name'
            defaultValue={cartDefaultValues.name}
            className="mt-1 text-gray-800 placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor='address' className="text-gray-800">收件地址</Label>
          <Input
            id='address'
            name='address'
            type='text'
            required
            autoComplete='street-address'
            defaultValue={cartDefaultValues.address}
            className="mt-1 text-gray-800 placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor='phone' className="text-gray-800">聯絡電話</Label>
          <Input
            id='phone'
            name='phone'
            type='tel'
            required
            autoComplete='tel'
            defaultValue={cartDefaultValues.phone}
            className="mt-1 text-gray-800 placeholder-gray-400"
          />
        </div>
        <div>
          <CheckoutButton />
        </div>
        {data?.message && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}
        <div className='text-sm text-center text-muted-foreground'>
          <Link href='/' className='hover:underline'>
            返回購物車
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CartForm_xx;