'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { signInDefaultValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signInWithCredentials } from '@/lib/actions/user.actions_xx';
import { useSearchParams } from 'next/navigation';

const CredentialSignInForm_xx = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'singing In...' : 'Sign In'}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='html'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='html'>Password</Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}
        <div className='text-sm text-center text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' target='_blank' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};
export default CredentialSignInForm_xx;
