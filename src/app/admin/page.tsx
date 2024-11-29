import CreateProduct from '@/components/admin/createProduct'
import AllProduct from '@/components/admin/allProduct'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
        <div className="grid gap-6">
          <CreateProduct />
          <AllProduct />
        </div>
      </div>
    </div>
  );
}

export default page
