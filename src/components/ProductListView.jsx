import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductListView = ({product}) => {
    const navigate=useNavigate()
    const {addToCart}=useCart()

  return (
    <div className='space-y-4 mt-2 rounded-md'>
        <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
            <div className='md:h-60 md:w-60 h-25 w-25 rounded-md overflow-hidden bg-gray-50'>
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className='w-full h-full object-cover cursor-pointer' 
                  onClick={()=>navigate(`/products/${product.id}`)}
                  onError={(e) => {
                    e.target.src = '/default-avatar.png';
                  }}
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                  No Image Available
                </div>
              )}
            </div>
            <div className='space-y-2'>
                <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full w-[220px]'>{product.title || product.name}</h1>
                <p className='font-semibold flex items-center md:text-lg text-sm'>₹<span className='md:text-2xl text-xl'>{product.price}</span>{product.discount && `(${product.discount}%off)`}</p>
                <p className='text-sm'>FREE delivery <span className='font-semibold'>Fri, 18 Apr</span><br/>
                or fastest delivery <span className='font-semibold'>Tomorrow, 17 Apr</span>
                </p>
                {product.stock > 0 ? (
                  <button onClick={()=>addToCart(product)} className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button>
                ) : (
                  <div className='bg-gray-300 text-gray-700 text-center py-1 px-3 rounded-md font-semibold inline-block'>Out of Stock</div>
                )}
            </div>
        </div>
    </div>
  )
}

export default ProductListView