import { Button } from '@/components/ui/button';
import ModeToggle_xx from './mode-toggle_66';
import Link from 'next/link';
import { EllipsisVertical, ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserButton_xx from './user-button_xx';
// import UserButton from './user-button_xx';

const Menu_xx = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle_xx />
        <Button asChild variant='ghost'>
          <Link href='/cart'>
            <ShoppingCart /> Cart
          </Link>
        </Button>
        { <UserButton_xx />}
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start p-3.5 py-4'>
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle_xx />
            <Button asChild variant='ghost'>
              <Link href='/cart'>
                <ShoppingCart /> Cart
              </Link>
            </Button>
            {<UserButton_xx />}
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu_xx;
