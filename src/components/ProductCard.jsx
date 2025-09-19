import React from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { getData } from '../context/DataContext'

const ProductCard = ({product}) => {
  const navigate=useNavigate()
  const {addToCart}=useCart()
  const { user } = useAuth();
  const { toggleProductAvailability } = getData();

  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:shadow-2xl transition-all p-2 w-full'>
      <div className='w-full aspect-square bg-gray-100 rounded-lg overflow-hidden min-h-[170px]' onClick={()=>navigate(`/products/${product.id}`)}>
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className='w-full h-full object-cover'
            onError={(e) => {
              e.target.src = '/default-avatar.png'; // fallback image
            }}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-400 bg-gray-50'>
            <div className="text-center">
              <div className="text-6xl mb-2">📷</div>
              <div>No Image Available</div>
            </div>
          </div>
        )}
      </div>
      <h1 className='line-clamp-2 p-1 font-semibold min-h-[2.2rem]'>{product.title || product.name}</h1>
      <p className="text-gray-500 text-sm min-h-[18px]">
    {product.quantity ? product.quantity : ""}
  </p>

      <p className='my-1 text-lg text-gray-800 font-bold'>₹{product.price}</p>
      {user && user.role === 'admin' && (
        <button onClick={() => toggleProductAvailability(product.id)} className={`mb-2 px-2 py-1 rounded text-xs ${product.stock > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {product.stock > 0 ? 'Set Out of Stock' : 'Set In Stock'}
        </button>
      )}
      {product.stock > 0 ? (
        <button onClick={()=>addToCart(product)} className='bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold'><IoCartOutline className='w-6 h-6'/> Add to Cart</button>
      ) : (
        <div className='bg-gray-300 text-gray-700 text-center py-2 rounded-md font-semibold'>Out of Stock</div>
      )}
    </div>
  )
}

export default ProductCard