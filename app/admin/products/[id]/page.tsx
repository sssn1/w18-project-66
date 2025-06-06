import { Metadata } from 'next';
import UpdateProductForm_xx from './update-product-form_xx';
import { getProductById } from '@/lib/actions/product.actions_66';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Update Product',
};

const UpdateProductPage_xx = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const product = await getProductById(id);
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