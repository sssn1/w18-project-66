import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly two decimal places'
  );

// Schema for inserting a product
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  brand: z.string().min(3, 'Brand must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for update products
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, 'Is is required'),
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Cart schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product id is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'slug is required'),
  qty: z.number().int().nonnegative('Quantity must be a positive integer'),
  image: z.string().min(1, 'Image is required'),
  price: currency,
});

// export const insertCartSchema = z.object({
//   userId: z.string().optional(),
//   sessionCartId: z.string(),
//   items: z.array(
//     z.object({
//       name: z.string(),
//       price: z.string(),
//       slug: z.string(),
//       productId: z.string(),
//       qty: z.number(),
//       image: z.string(),
//     })
//   ),
//   itemsPrice: z.string(),
//   totalPrice: z.string(),
//   shippingPrice: z.string(),
//   taxPrice: z.string(),
// });

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCardId: z.string().min(1, 'Session card id is required'),
  userId: z.string().optional().nullable(),
});

// Schema for updating the user profile
export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at leaast 3 characters'),
  email: z.string().min(3, 'Email must be at leaast 3 characters'),
});

// Schema to update users
export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'Id is required'),
  role: z.string().min(1, 'Role is required'),
});
