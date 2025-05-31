import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';

import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        let user = null;
        if (credentials == null) return null;

        // Find user in database
        user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        // console.log('authorize: user ', user);

        // Check if user exists and if the password matches
        if (user && user.password) {
          const isMatch = await compareSync(
            credentials.password as string,
            user.password
          );
          // console.log('authorize: isMatch ', isMatch);

          // If password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user does not exist or password does not match return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // console.log('session1', session);
      // console.log('token', token);
      // console.log('user', user);
      // Set the user id on the session
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // If there is an update, set the name on the session
      if (trigger === 'update') {
        session.user.name = user.name;
      }
      // console.log('session2', session);
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to ken
      if (user) {
        token.role = user.role;

        //if user has no name then use the email
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          // update database to reflect the token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
    authorized({ request, auth }: any) {
      // Array of regex patterns of paths we want to protect
      const protectedPaths = [
        /^\/user\/.*/,
        /^\/admin\/.*/,
        /^\/cart\/.*/,
        /^\/order\/.*/,
      ];

      // Get pathname form teh request URL object
      const { pathname } = request.nextUrl;

      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      if (!request.cookies.get('sessionCartId')) {
        // check for session cart cookie
        // generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();
        console.log('sessionCartId', sessionCartId);
        // clone the req headers
        const newRequestHeaders = new Headers(request.headers);
        // create new response and add new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // set newly generated session cart id in the response cookie
        response.cookies.set('sessionCartId', sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
