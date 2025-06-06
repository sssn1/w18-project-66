import Link from 'next/link';
import {
  getAllProducts,
  deleteProduct,
} from '@/lib/actions/product.actions_66';
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

const AdminProductsPage_xx = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  // console.log('props', props);
  await requireAdmin();
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || '';
  const category = searchParams.category || '';

  const products = await getAllProducts({
    query: searchText,
    // limit: 2,
    page,
    category,
  });

  // console.log('products', products);

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <h1 className='h2-bold'>Products</h1>
          {searchText && (
            <div>
              Filtered by <i>&quot;{searchText}&quot;</i>{' '}
              <Link href='/admin/products'>
                <Button variant='outline' size='sm'>
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant='default'>
          <Link href='/admin/products/create'>Create Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead className='text-right'>PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead className='w-[100px]'>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formatId(product.id)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className='text-right'>
                {formatCurrency(product.price.toString())}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating.toString()}</TableCell>
              <TableCell className='flex gap-1'>
                <Button asChild variant='outline' size='sm'>
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <DeleteDialog
                  id={product.id}
                  action={deleteProduct}
                ></DeleteDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products.totalPages && products.totalPages > 1 && (
        <Pagination page={page} totalPages={products.totalPages} />
      )}
    </div>
  );
};
export default AdminProductsPage_xx;
