import { Metadata } from 'next';
import CreateProductForm_xx from './create-product-form_xx';

export const metadata: Metadata = {
  title: 'Create Product',
};

const CreateProductPage_xx = () => {
  return (
    <>
      <h2 className='h2-bold'>Create Product</h2>
      <div className='my-8'>
        <CreateProductForm_xx />
      </div>
    </>
  );
};
export default CreateProductPage_xx;
