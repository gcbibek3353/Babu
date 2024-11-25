import HeroPage from "@/components/HeroPage";
import CategoryContainer from "@/components/categoryContainer";
import { getAllProducts } from "@/actions/product";
import { createProduct } from "@/actions/product";
import { addUser } from "@/actions/user";

export default async function Home() {
  const res = await getAllProducts();
  if(!res || !res.products) return <div>Failed to get Products</div>

  const uniqueCategories: any = Array.from(new Set(res.products.map((product: any) => product.category)));
  
  // await createProduct({
  //   "name" : "coca cola",
  //             "description" : "Enjoy the drink",
  //             "price" : 60,
  //             "imageUrl" : "https://i.ibb.co/mCpHFG5/fec89b7b-8a13-477e-b750-7a52e82828a0.jpg",
  //             "category" : "cold_Drink",
  //             "inStock" : 1
  // })

  // await addUser({
  //   name : "Bivek",
  //   phone : 983746527,
  //   email : "bivek@gmail.com",
  //   password : "bivek@gmail.com",
  //   city : "bangalore",
  //   address : "GET"
  // })

  return (
    <div>
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

