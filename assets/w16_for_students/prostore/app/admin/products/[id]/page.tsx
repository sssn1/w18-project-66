import { Metadata } from 'next';
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

  return <>UpdateProductPage_xx</>;
};
export default UpdateProductPage_xx;
