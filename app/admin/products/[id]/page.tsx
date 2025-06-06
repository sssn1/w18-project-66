import { Metadata } from 'next';
import UpdateProductForm_xx from './update-product-form_xx';
import { getProductById } from '@/lib/actions/procduct.actions_xx';
import notFound from '@/app/not-found';

export const metadata: Metadata = {
  title: 'Update Product',
};

const UpdateProductPage_xx = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const product = await getProductById(id);
  console.log('product', product);
  console.log('typeof product', typeof product);
  if (!product) notFound();

  return (
    <>
      <h2 className='h2-bold'>Update Product</h2>
      <div className='my-8'>
        <UpdateProductForm_xx product={product} productId={product?.id ?? ''} />
      </div>
    </>
  );
};
export default UpdateProductPage_xx;
