import ProductCard_66 from "./product-card_66";

const ProductList_66 = ({data,title,limit}: {data: any, title?: string, limit?: number}) => {
   // console.log('data', data); 
   const limitData = limit ? data.slice(0, limit) : data;
    return <div className="my-10">
        <h2 className="h2-bold mb-4">{title}</h2>
        {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {limitData.map((product: any) => (
                    <ProductCard_66 key={product.slug} product={product} />
                ))}
            </div>
        ) : (
            <div >
                <p>NO product found </p>
            </div>
        )}
    </div>
        
};

export default ProductList_66;