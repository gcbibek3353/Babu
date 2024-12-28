import { getAllProducts } from '@/actions/product';
import EditButton from './editButton';
import DeleteBtn from './deleteBtn';
import Image from 'next/image';

const allProduct = async () => {
  const res = await getAllProducts();
  if (!res || !res.products) return <div>Failed to get Products</div>

  const uniqueCategories = Array.from(new Set(res.products.map((product) => product.category)));


  return (
    <div>
      {/* Categories create similar component as navbar where all unique categories will be placed */}
      {
        uniqueCategories.map((category , index ) => (
          <p
            key={index}
            className="text-sm font-medium text-gray-600 bg-gray-200 px-3 py-1 rounded-md inline-block mr-2 mb-2 cursor-pointer"
          >
            {category}
          </p>
        ))
      }

{
  res.products.map(product => (
    <div 
      key={product.id} 
      className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 mb-4"
    >
      <Image 
        src={product.imageUrl as string} 
        alt={product.name} 
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-grow">
        <p className="text-lg font-semibold text-gray-800">{product.name}</p>
        <p className="text-sm text-gray-600">₹{product.price}</p>
      </div>
      <div className="flex gap-2">
        <EditButton 
          id={product.id} 
          // className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        />
        <DeleteBtn 
          id={product.id} 
          // className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
        />
      </div>
    </div>
  ))
}



    </div>
  )
}

export default allProduct
