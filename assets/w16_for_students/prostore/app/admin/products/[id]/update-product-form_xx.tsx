'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { updateProductSchema } from '@/lib/validator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { productDefaultValues } from '@/lib/constants';
import slugify from 'slugify';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { UploadButton } from '@/lib/uploadthing';
import { updateProduct } from '@/lib/actions/procduct.actions_xx';
import { Checkbox } from '@/components/ui/checkbox';

const UpdateProductForm_xx = ({
  product,
  productId,
}: {
  product: z.infer<typeof updateProductSchema>;
  productId: string;
}) => {
  const router = useRouter();

  return <>UpdateProductForm_xx</>;
};
export default UpdateProductForm_xx;
