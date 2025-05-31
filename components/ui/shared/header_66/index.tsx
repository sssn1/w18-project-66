import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import {EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react';
import Modetoggle_66 from './mode-toggle_66';
import { Button } from '../../button';
import Menu_xx from './menu_xx';
const Header_66 = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/'>
            <Image src='/images/logo.svg' height={48} width={48} priority={true} alt={`${APP_NAME} logo`} />
          </Link>
        </div>
        <Menu_xx />
        {/* <div className="flex justify-end gap-3">
            <Modetoggle_66 />
          <Button asChild variant='outline'>
            <Link href='/cart' >
            <ShoppingCart /> Cart_66
            </Link>
          </Button>
          <Button asChild >
            <Link href='/sign-in' >
            <UserIcon /> Sign In
            </Link>
          </Button>
        </div> */}
      </div>
    </header>
  );
};

export default Header_66;