'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { formSchema } from '@/components/tutorial/schema';
import { handleFormAction } from '@/components/tutorial/actions/forms/form-4';

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'raj@gmail.com',
      name: 'Raj Kapadia',
      password: 'abcdefg12345678',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    startTransition(async () => {
      const data = await handleFormAction(values);
      if (data.error) {
        form.setError('root', { message: data.message });
      } else {
        router.replace('/new-page');
      }
    });
  };

  return (
    <div className='flex flex-col items-center justify-center mt-12'>
      <h1 className='mb-6 text-2xl font-extrabold'>
        NextJs Ultimate Form Guide
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6'
        >
          {form.formState.errors.root && (
            <div className='text-destructive text-sm'>
              {form.formState.errors.root.message}
            </div>
          )}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' {...field}></Input>
                </FormControl>
                <FormDescription>Enter your full name</FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='text' {...field}></Input>
                </FormControl>
                <FormDescription>Enter the email</FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field}></Input>
                </FormControl>
                <FormDescription>Enter the password</FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <Button type='submit'>{isPending ? 'Submitting' : 'Submit'}</Button>
        </form>
      </Form>
    </div>
  );
}
