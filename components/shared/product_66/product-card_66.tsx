import {Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import Rating_66 from './rating_66';
import ProductPrice_66 from './product-price_66';

const ProductCard_66 = ({product}: {product: any}) => {
  return <Card className="w-full max-w-sm">
    <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
            <Image src={product.images[0]} alt={product.name} width={300} height={300} priority={true} />
        </Link>
    </CardHeader>
    <CardContent className='p-4 grid gap-4'>
        <div className='text-xs'>
            {product.brand }
        </div>
        <Link href={`/product/${product.slug}`}>
        <h2 className='text-sm font-medium'>
            {product.name}
        </h2>
        </Link>
        <div className='flex-between gap-4' >
            <Rating_66 value={Number(product.rating)} />
            {product.stock > 0 ? (
                <ProductPrice_66 value={Number(product.price)} />
            ) : (
                <p className='text-destructive'>Out OF STOCK</p>
            )}
        </div>
    </CardContent>
  </Card>
}

export default ProductCard_66;