import HeroPage from "@/components/HeroPage";
import CategoryContainer from "@/components/categoryContainer";
import { getAllProducts } from "@/actions/product";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const res = await getAllProducts();
  if(!res || !res.products) return <div>Failed to get Products</div>

  const uniqueCategories = Array.from(new Set(res.products.map((product) => product.category)));
  
  return (
    <div>
      <Navbar products={res.products} />
      <HeroPage />
      {
        uniqueCategories.map((category,index)=><CategoryContainer key={index} category={category}></CategoryContainer>
        )
      }

      {/* footer  */}
    </div>
    // <div>hello</div>
  );
}

