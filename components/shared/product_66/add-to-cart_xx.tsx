'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.actions_66';

const AddToCart_xx = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast.error('Adding not successful', {
        description: res.message,
      });
      return;
    }

    toast.success('Adding successful', {
      description: `${item.name} added to cart`,
      action: {
        label: 'Go to cart',
        onClick: () => router.push('/cart'),
      },
    });
  };

  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      Add To Cart
    </Button>
  );
};
export default AddToCart_xx;
