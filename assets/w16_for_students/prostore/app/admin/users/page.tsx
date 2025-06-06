import { Metadata } from 'next';
import { getAllUsers, deleteUser } from '@/lib/actions/user.actions_xx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';
import { Badge } from '@/components/ui/badge';
import DeleteDialog from '@/components/shared/delete-dialog_xx';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Admin Users',
};

const AdminUserPage = async () => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-3'>
        <h1 className='h2-bold'>Users</h1>
      </div>
    </div>
  );
};

export default AdminUserPage;
