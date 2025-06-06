import Link from 'next/link';
import {
  getAllProducts,
  deleteProduct,
} from '@/lib/actions/procduct.actions_xx';
import { formatCurrency, formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog_xx';
import { requireAdmin } from '@/lib/auth.guard';

const AdminProductsPage_xx = async () => {
  // console.log('products', products);

  return <>AdminProductsPage_xx</>;
};
export default AdminProductsPage_xx;
