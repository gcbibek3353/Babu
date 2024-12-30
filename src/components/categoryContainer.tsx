import { getProductByCategory } from "@/actions/product"
import ProductCard from "./ProductCard";

const categoryContainer = async ({category}:{category : string}) => {
  const res = await getProductByCategory(category);

  if(!res.success || !res.products?.length ) return <div>Category wise data not found </div>
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-center md:text-left md:text-2xl mb-4">
        {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {res.products?.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
  
}

export default categoryContainer
