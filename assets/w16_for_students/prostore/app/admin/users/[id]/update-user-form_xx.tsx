'use client';

import { updateUserSchema } from '@/lib/validator';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { USER_ROLES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { updateUser } from '@/lib/actions/user.actions_xx';

const UpdateUserForm_xx = () => {
  return <>UpdateUserForm_xx</>;
};
export default UpdateUserForm_xx;
