import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Menu_xx from '@/components/ui/shared/header_66/menu_xx';
import MainNav_xx from './main-nav_xx';

export const metadata: Metadata = {
  title: 'user_xx',
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='flex h-screen flex-col'>
        <div className='flex flex-col'>
          <div className='border-b container mx-auto'>
            <div className='flex items-center h-16 w-full'>
              <div className='flex-start'>
                <Link href='/' className='w-22'>
                  <Image
                    src='/images/logo.svg'
                    height={48}
                    width={48}
                    alt={APP_NAME}
                    priority={true}
                  />
                </Link>
              </div>

              {<MainNav_xx className='mx-6' /> }
              <div className='ml-auto items-center flex space-x-4'>
                <Menu_xx />
              </div>
            </div>
          </div>

          <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}