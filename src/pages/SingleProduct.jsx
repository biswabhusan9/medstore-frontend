// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import Loading from '../assets/Loading4.webm'
// import BreadCrums from '../components/BreadCrums'
// import { IoCartOutline } from 'react-icons/io5'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'
// import { db } from '../firebase/config'
// import { doc, getDoc } from 'firebase/firestore'

// const SingleProduct = () => {
//     const params = useParams()
//     const [singleProduct, setSingleProduct] = useState("")
//     const [quantity, setQuantity] = useState(1)
//     const {addToCart} = useCart()
//     const { user } = useAuth();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const docRef = doc(db, 'medicine', params.id);
//                 const docSnap = await getDoc(docRef);
                
//                 if (docSnap.exists()) {
//                     setSingleProduct({ id: docSnap.id, ...docSnap.data() });
//                 } else {
//                     console.log("No such document!");
//                 }
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//             }
//         };

//         fetchProduct();
//     }, [params.id]);

//     if (!singleProduct) {
//         return (
//             <div className='flex items-center justify-center min-h-[400px] py-20'>
//                 <video muted autoPlay loop>
//                     <source src={Loading} type='video/webm' />
//                 </video>
//             </div>
//         )
//     }

//     const OriginalPrice = Math.round(singleProduct.price + (singleProduct.price * singleProduct.discount / 100))
//     return (
//         <>
//             <div className='px-4 pb-4 md:px-0'>
//                 <BreadCrums title={singleProduct.title}/>
//                 <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
//                     {/* product image */}
//                     <div className='w-full h-[400px] md:h-[500px] bg-gray-50 rounded-2xl overflow-hidden'>
//                         {singleProduct.imageUrl ? (
//                             <img 
//                                 src={singleProduct.imageUrl} 
//                                 alt={singleProduct.title} 
//                                 className='w-full h-full object-contain'
//                                 onError={(e) => {
//                                     e.target.src = '/default-avatar.png';
//                                 }}
//                             />
//                         ) : (
//                             <div className='w-full h-full flex items-center justify-center text-gray-400'>
//                                 <div className="text-center">
//                                     <div className="text-6xl mb-2">📷</div>
//                                     <div>No Image Available</div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     {/* product details */}
//                     <div className='flex flex-col gap-6'>
//                         <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{singleProduct.title || singleProduct.name}</h1>
//                         <div className='text-gray-700'>{singleProduct.category?.toUpperCase()}</div>
//                         <p className='text-xl text-red-500 font-bold'>₹{singleProduct.price}
//                         {singleProduct.discount && (
//                           <>
//                             <span className='line-through px-2 text-gray-700'>₹{OriginalPrice}</span>
//                             <span className='bg-red-500 text-white px-4 py-1 rounded-full'>{singleProduct.discount}% discount</span>
//                           </>
//                         )}
//                         </p>
//                         <p className='text-gray-600'>{singleProduct.description}</p>
//                         {/* quantity selector */}
//                         <div className='flex items-center gap-4'>
//                             <label htmlFor='quantity' className='text-sm font-medium text-gray-700'>Quantity:</label>
//                             <div className='relative w-32'>
//                                 <select 
//                                     id='quantity'
//                                     className='w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer pr-10'
//                                     onChange={(e) => {
//                                         const newQty = parseInt(e.target.value);
//                                         setQuantity(newQty);
//                                     }}
//                                     value={quantity}
//                                 >
//                                     <option value={1}>1</option>
//                                     <option value={2}>2</option>
//                                     <option value={3}>3</option>
//                                     <option value={4}>4</option>
//                                     <option value={5}>5</option>
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                                         <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                         {user && user.role === 'admin' && (
//                             <div className={`mb-2 px-4 py-2 rounded text-sm inline-block ${singleProduct.stock > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
//                                 Stock: {singleProduct.stock}
//                             </div>
//                         )}
//                         {singleProduct.stock > 0 ? (
//                             <div className='flex gap-4 mt-4'>
//                                 <button 
//                                     onClick={() => {
//                                         const productWithQuantity = { ...singleProduct, quantity };
//                                         addToCart(productWithQuantity);
//                                     }} 
//                                     className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'
//                                 >
//                                     <IoCartOutline className='w-6 h-6'/> Add to Cart
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className='bg-gray-300 text-gray-700 text-center py-2 rounded-md font-semibold mt-4'>Out of Stock</div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SingleProduct

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import BreadCrums from '../components/BreadCrums'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const SingleProduct = () => {
    const params = useParams()
    const [singleProduct, setSingleProduct] = useState("")
    const [quantity, setQuantity] = useState(1) // ✅ this is actually cartQuantity
    const { addToCart } = useCart()
    const { user } = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'medicine', params.id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setSingleProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (!singleProduct) {
        return (
            <div className='flex items-center justify-center min-h-[400px] py-20'>
                <video muted autoPlay loop>
                    <source src={Loading} type='video/webm' />
                </video>
            </div>
        )
    }

    const OriginalPrice = Math.round(
        singleProduct.price + (singleProduct.price * singleProduct.discount / 100)
    );

    return (
        <div className='px-4 pb-4 md:px-0'>
            <BreadCrums title={singleProduct.title}/>
            <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
                
                {/* product image */}
                <div className='w-full h-[400px] md:h-[500px] bg-gray-50 rounded-2xl overflow-hidden'>
                    {singleProduct.imageUrl ? (
                        <img 
                            src={singleProduct.imageUrl} 
                            alt={singleProduct.title} 
                            className='w-full h-full object-contain'
                            onError={(e) => { e.target.src = '/default-avatar.png'; }}
                        />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center text-gray-400'>
                            <div className="text-center">
                                <div className="text-6xl mb-2">📷</div>
                                <div>No Image Available</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* product details */}
                <div className='flex flex-col gap-6'>
                    <h1 className='md:text-3xl text-xl font-bold text-gray-800'>
                        {singleProduct.title || singleProduct.name}
                    </h1>
                    <div className='text-gray-700'>
                        {singleProduct.category?.toUpperCase()}
                    </div>
                    <p className='text-xl text-red-500 font-bold'>
                        ₹{singleProduct.price}
                        {singleProduct.discount && (
                          <>
                            <span className='line-through px-2 text-gray-700'>
                                ₹{OriginalPrice}
                            </span>
                            <span className='bg-red-500 text-white px-4 py-1 rounded-full'>
                                {singleProduct.discount}% discount
                            </span>
                          </>
                        )}
                    </p>

                    {/* ✅ SHOW QUANTITY INFO (from Firestore "quantity" field) */}
                    {singleProduct.quantity && (
                        <p className="text-gray-500 text-sm">
                            {singleProduct.quantity}
                        </p>
                    )}

                    <p className='text-gray-600'>{singleProduct.description}</p>

                    {/* quantity selector (cart quantity) */}
                    <div className='flex items-center gap-4'>
                        <label htmlFor='quantity' className='text-sm font-medium text-gray-700'>
                            Quantity:
                        </label>
                        <div className='relative w-32'>
                            <select 
                                id='quantity'
                                className='w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer pr-10'
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                value={quantity}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {user && user.role === 'admin' && (
                        <div className={`mb-2 px-4 py-2 rounded text-sm inline-block ${singleProduct.stock > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            Stock: {singleProduct.stock}
                        </div>
                    )}

                    {singleProduct.stock > 0 ? (
                        <div className='flex gap-4 mt-4'>
                            <button 
                                onClick={() => {
                                    // ✅ FIXED: Send cartQuantity, not just quantity
                                    const productWithQuantity = { 
                                        ...singleProduct, 
                                        cartQuantity: quantity // ✅ FIX
                                    };
                                    addToCart(productWithQuantity);
                                }} 
                                className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'
                            >
                                <IoCartOutline className='w-6 h-6'/> Add to Cart
                            </button>
                        </div>
                    ) : (
                        <div className='bg-gray-300 text-gray-700 text-center py-2 rounded-md font-semibold mt-4'>
                            Out of Stock
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
