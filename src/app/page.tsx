import HeroPage from "@/components/HeroPage";
import CategoryContainer from "@/components/categoryContainer";
import { getAllProducts } from "@/actions/product";
import { createProduct } from "@/actions/product";
import { addUser } from "@/actions/user";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const res = await getAllProducts();
  if(!res || !res.products) return <div>Failed to get Products</div>

  const uniqueCategories: any = Array.from(new Set(res.products.map((product: any) => product.category)));
  
  return (
    <div>
      <Navbar products={res.products} />
      <HeroPage />
      {
        uniqueCategories.map((category : any,index : any)=><CategoryContainer key={index} category={category}></CategoryContainer>
        )
      }

      {/* footer  */}
    </div>
    // <div>hello</div>
  );
}

