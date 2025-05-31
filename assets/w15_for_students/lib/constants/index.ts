export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Prostore';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'A modern store built with Next.js, ShadCN, and Prisma';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: 0,
  numReviews: 0,
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(',')
  : ['admin', 'user'];
