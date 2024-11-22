import { addOrder, getOrderById, getOrders, updateOrderStatus } from "@/actions/order";
import { createProduct, deleteProduct, getAllProducts, getProductByCategory, getProductById, updateProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { addUser } from "@/actions/user";
export default async function Home() {
  // await createProduct({
  //   name: "Mango",
  //   description: "Mango is healthy",
  //   price: 100,
  //   imageUrl: "blabla",
  //   category: "fruit",
  //   inStock: 1
  // })

  // const products = await getAllProducts();
  // console.log(products.products);

  // const res = await getProductById(4);
  // console.log(res);

  // const res = await updateProduct(3,{
  //     name: "apple",
  //     description: "apple is healthy",
  //     price: 100,
  //     imageUrl: "blabla",
  //     category: "fruit",
  //     inStock: 1
  //   })
  //   console.log(res);

  // const res = await deleteProduct(4);

  // const res = await getProductByCategory('vegetable')
  // console.log(res.products);
  
  await addUser({
    name : "Bivek",
    phone : 98,
    email : "try.bivek@gmail.com",
    password : "password123",
    city : "Bangalore",
    address : "FET-JU Kanakapura"
  })

  // await addOrder({
  //   productId: 3,
  //   userId: 1,
  //   quantity: 2,
  //   total_amount: 1000,
  //   address: "Uppalachaur , Baglung"
  // })
  
  // const res = await getOrders();
  // console.log(res);

  // const res = await getOrderById(2);
  // console.log(res);
  
  // await updateOrderStatus(2,"delivered");

  return (
    <div>
      Babu
      <Button variant={"link"}>Click me </Button>
    </div>
  );
}
