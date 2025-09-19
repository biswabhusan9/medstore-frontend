// import React, { useState, useEffect } from 'react'
// import { useCart } from '../context/CartContext'
// import { FaRegTrashAlt } from 'react-icons/fa'
// import { LuNotebookText } from 'react-icons/lu'
// import { MdDeliveryDining } from 'react-icons/md'
// import { GiShoppingBag } from 'react-icons/gi'
// import { useAuth } from '../context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import emptyCart from '../assets/empty-cart.png'

// const Cart = ({ location, getLocation }) => {
//   const { cartItem, updateQuantity, deleteItem, setCartItem } = useCart()
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   // Delivery info state
//   const [fullName, setFullName] = useState('')
//   const [address, setAddress] = useState('')
//   const [state, setState] = useState('')
//   const [postcode, setPostcode] = useState('')
//   const [country, setCountry] = useState('')
//   const [phone, setPhone] = useState('')

//   // Validation error state
//   const [formError, setFormError] = useState('')

//   useEffect(() => {
//     if (location) {
//       setAddress(
//         location.road ||
//           location.neighbourhood ||
//           location.suburb ||
//           location.village ||
//           location.town ||
//           location.city ||
//           ''
//       )
//       setState(location.state || '')
//       setPostcode(location.postcode || '')
//       setCountry(location.country || '')
//     }
//   }, [location])

//   const totalPrice = cartItem.reduce(
//     (total, item) => total + (item.price || 0) * (item.quantity || 0),
//     0
//   )

//   const handleConfirmOrder = () => {
//     setFormError('') // reset error message

//     // Validation before placing order
//     if (!fullName) return setFormError('Please enter your full name.')
//     if (!address) return setFormError('Please enter your address.')
//     if (!state) return setFormError('Please enter your state.')
//     if (!postcode) return setFormError('Please enter your postcode.')
//     if (!country) return setFormError('Please enter your country.')
//     if (!phone) return setFormError('Please enter your phone number.')

//     const order = {
//       items: cartItem,
//       status: 'Pending', // default status
//       date: new Date().toLocaleString(),
//       address: {
//         fullName,
//         address,
//         state,
//         postcode,
//         country,
//         phone
//       }
//     }

//     const storedOrders = JSON.parse(localStorage.getItem('orders')) || []
//     storedOrders.push(order)
//     localStorage.setItem('orders', JSON.stringify(storedOrders))
//     setCartItem([]) // clear the cart
//     navigate('/orders')
//   }

//   return (
//     <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
//       {cartItem.length > 0 ? (
//         <div>
//           <h1 className='font-bold text-2xl'>My Cart ({cartItem.length})</h1>
//           <div>
//             <div className='mt-10'>
//               // In your Cart.jsx file, find the map section where you show each cart item.
// // Only update inside that part. Keep the rest of the file same as your original code.

// {cartItem.map((item, index) => (
//   <div
//     key={index}
//     className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'
//   >
//     {/* Product Info */}
//     <div className='flex items-center gap-4'>
//       <img
//         src={item.imageUrl}
//         alt={item.name}
//         className='w-20 h-20 rounded-md object-cover'
//       />
//       <div>
//         {/* Product Name */}
//         <h1 className='md:w-[300px] line-clamp-2'>
//           {item.name || 'Unnamed Product'}
//         </h1>

//         {/* ✅ Show medicine quantity from Firestore */}
//         <p className='text-gray-500 text-sm'>
//           {item.quantityText || 'No quantity info'}
//         </p>

//         {/* Price */}
//         <p className='text-red-500 font-semibold text-lg'>
//           ${item.price}
//         </p>
//       </div>
//     </div>

//     {/* ✅ Fixed Quantity Controls */}
//     <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
//       <button
//         onClick={() => updateQuantity(item.id, 'dec')}
//         className='cursor-pointer'
//       >
//         -
//       </button>
//       <span>{item.quantity}</span>
//       <button
//         onClick={() => updateQuantity(item.id, 'inc')}
//         className='cursor-pointer'
//       >
//         +
//       </button>
//     </div>

//     {/* Delete Button */}
//     <span
//       onClick={() => deleteItem(item.id)}
//       className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'
//     >
//       <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
//     </span>
//   </div>
// ))}

//             </div>

//             {/* Delivery Info Section */}
//             <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
//               <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
//                 <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>

//                 {formError && (
//                   <p className='text-red-500 text-center font-medium animate-bounce'>
//                     {formError}
//                   </p>
//                 )}

//                 <div className='flex flex-col space-y-1'>
//                   <label>Full Name</label>
//                   <input
//                     type='text'
//                     placeholder='Enter your name'
//                     className='p-2 rounded-md'
//                     value={fullName}
//                     onChange={e => setFullName(e.target.value)}
//                   />
//                 </div>

//                 <div className='flex flex-col space-y-1'>
//                   <label>Address</label>
//                   <input
//                     type='text'
//                     placeholder='Enter your address'
//                     className='p-2 rounded-md'
//                     value={address}
//                     onChange={e => setAddress(e.target.value)}
//                   />
//                 </div>

//                 <div className='flex w-full gap-5'>
//                   <div className='flex flex-col space-y-1 w-full'>
//                     <label>State</label>
//                     <input
//                       type='text'
//                       placeholder='Enter your state'
//                       className='p-2 rounded-md w-full'
//                       value={state}
//                       onChange={e => setState(e.target.value)}
//                     />
//                   </div>
//                   <div className='flex flex-col space-y-1 w-full'>
//                     <label>PostCode</label>
//                     <input
//                       type='text'
//                       placeholder='Enter your postcode'
//                       className='p-2 rounded-md w-full'
//                       value={postcode}
//                       onChange={e => setPostcode(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className='flex w-full gap-5'>
//                   <div className='flex flex-col space-y-1 w-full'>
//                     <label>Country</label>
//                     <input
//                       type='text'
//                       placeholder='Enter your country'
//                       className='p-2 rounded-md w-full'
//                       value={country}
//                       onChange={e => setCountry(e.target.value)}
//                     />
//                   </div>
//                   <div className='flex flex-col space-y-1 w-full'>
//                     <label>Phone No</label>
//                     <input
//                       type='text'
//                       placeholder='Enter your Number'
//                       className='p-2 rounded-md w-full'
//                       value={phone}
//                       onChange={e => setPhone(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <button
//                   className='bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer'
//                   onClick={handleConfirmOrder}
//                 >
//                   Submit
//                 </button>

//                 <div className='flex items-center justify-center w-full text-gray-700'>
//                   -----OR-----
//                 </div>

//                 <div className='flex justify-center'>
//                   <button
//                     onClick={getLocation}
//                     className='bg-red-500 text-white px-3 py-2 rounded-md'
//                   >
//                     Detect Location
//                   </button>
//                 </div>
//               </div>

//               {/* Bill Details */}
//               <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
//                 <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>

//                 <div className='flex justify-between items-center'>
//                   <h1 className='flex gap-1 items-center text-gray-700'>
//                     <LuNotebookText />
//                     Items total
//                   </h1>
//                   <p>${totalPrice}</p>
//                 </div>

//                 <div className='flex justify-between items-center'>
//                   <h1 className='flex gap-1 items-center text-gray-700'>
//                     <MdDeliveryDining />
//                     Delivery Charge
//                   </h1>
//                   <p className='text-red-500 font-semibold'>
//                     <span className='text-gray-600 line-through px-1'>$5</span>
//                     FREE
//                   </p>
//                 </div>

//                 <div className='flex justify-between items-center'>
//                   <h1 className='flex gap-1 items-center text-gray-700'>
//                     <GiShoppingBag />
//                     Handling Charge
//                   </h1>
//                   <p className='text-red-500 font-semibold'>$3</p>
//                 </div>

//                 <hr className='text-gray-200 mt-2' />

//                 <div className='flex justify-between items-center'>
//                   <h1 className='font-semibold text-lg'>Grand total</h1>
//                   <p className='font-semibold text-lg'>${totalPrice + 3}</p>
//                 </div>

//                 <div>
//                   <h1 className='font-semibold text-gray-700 mb-3 mt-7'>
//                     Apply Promo Code
//                   </h1>
//                   <div className='flex gap-3'>
//                     <input
//                       type='text'
//                       placeholder='Enter code'
//                       className='p-2 rounded-md w-full'
//                     />
//                     <button className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md'>
//                       Apply
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3'
//                   onClick={handleConfirmOrder}
//                 >
//                   Confirm Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
//           <h1 className='text-red-500/80 font-bold text-5xl text-muted'>
//             Oh no! Your cart is empty
//           </h1>
//           <img src={emptyCart} alt='' className='w-[400px]' />
//           <button
//             onClick={() => navigate('/products')}
//             className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer'
//           >
//             Continue Shopping
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Cart


import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LuNotebookText } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { GiShoppingBag } from 'react-icons/gi'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import emptyCart from '../assets/empty-cart.png'

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem, setCartItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Delivery info state
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  

  // Validation error state
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (location) {
      setAddress(
        location.road ||
          location.neighbourhood ||
          location.suburb ||
          location.village ||
          location.town ||
          location.city ||
          ''
      )
      setState(location.state || '')
      setPostcode(location.postcode || '')
      setCountry(location.country || '')
    }
  }, [location])

  // ✅ Calculate total price based on cart item quantities
  const totalPrice = cartItem.reduce(
    (total, item) => total + (item.price || 0) * (item.cartQuantity || 0),
    0
  )


  const handleConfirmOrder = async () => {
  setFormError('')

  // ✅ Validation before placing order
  if (!fullName) return setFormError('Please enter your full name.')
  if (!address) return setFormError('Please enter your address.')
  if (!state) return setFormError('Please enter your state.')
  if (!postcode) return setFormError('Please enter your postcode.')
  if (!country) return setFormError('Please enter your country.')
  if (!phone) return setFormError('Please enter your phone number.')

  try {
    const totalItems = cartItem.reduce(
        (sum, item) => sum + (item.cartQuantity || 0),
        0
      ) 
    // ✅ Prepare order object safely (no undefined values)
    const order = {
      userId: user?.uid || null,
      userEmail: user?.email || '',
      items: cartItem.map(item => ({
        id: item.id || '',
        name: item.name || '',
        imageUrl: item.imageUrl || '',
        price: item.price || 0,
        quantityInfo: item.quantityText || '', // Show "20 Tablets" properly
        // cartQuantity: item.quantity ?? 0 // Number of pieces user ordered
        cartQuantity: item.cartQuantity > 0 ? item.cartQuantity : 1, // ✅ FIXED
        totalItemPrice: (item.price || 0) * (item.cartQuantity > 0 ? item.cartQuantity : 1) // ✅ FIXED
      })),
      totalItems: totalItems,
      totalPrice: totalPrice || 0,
      grandTotal: (totalPrice || 0) + 3,
      status: 'Pending',
      date: serverTimestamp(),
      address: {
        fullName: fullName || '',
        address: address || '',
        state: state || '',
        postcode: postcode || '',
        country: country || '',
        phone: phone || ''
      }
    }

    console.log('📦 Final Order Object:', order) // Debug log

    // ✅ Save order to Firestore
    await addDoc(collection(db, 'orders'), order)

    // ✅ Clear cart after placing order
    setCartItem([])

    // ✅ Redirect to Orders page
    navigate('/orders')
  } catch (error) {
    console.error('🔥 Firestore Add Error:', error)
    setFormError(error.message || 'Something went wrong. Please try again!')
  }
}

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {cartItem.length > 0 ? (
        <div>
          <h1 className='font-bold text-2xl'>My Cart ({cartItem.length})</h1>
          <div className='mt-10'>
            {cartItem.map((item, index) => (
              <div
                key={index}
                className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'
              >
                {/* Product Info */}
                <div className='flex items-center gap-4'>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-20 h-20 rounded-md object-cover'
                  />
                  <div>
                    <h1 className='md:w-[300px] line-clamp-2'>
                      {item.name || 'Unnamed Product'}
                    </h1>

                    {/* ✅ Show quantity info like "20 Tablets" */}
                    <p className='text-gray-500 text-sm'>
                      {item.quantityText || 'No quantity info'}
                    </p>

                    <p className='text-red-500 font-semibold text-lg'>
                      ₹{(item.price || 0) * (item.cartQuantity || 0)} 
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                  <button
                    onClick={() => updateQuantity(item.id, 'dec')}
                    className='cursor-pointer'
                  >
                    -
                  </button>
                  <span>{item.cartQuantity}</span> {/* ✅ Correctly show user-selected quantity */}
                  <button
                    onClick={() => updateQuantity(item.id, 'inc')}
                    className='cursor-pointer'
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <span
                  onClick={() => deleteItem(item.id)}
                  className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'
                >
                  <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
                </span>
              </div>
            ))}
          </div>

          {/* Delivery Info Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
            {/* Delivery Form */}
            <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
              <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>

              {formError && (
                <p className='text-red-500 text-center font-medium animate-bounce'>
                  {formError}
                </p>
              )}

              {/* Form Fields */}
              <div className='flex flex-col space-y-1'>
                <label>Full Name</label>
                <input
                  type='text'
                  placeholder='Enter your name'
                  className='p-2 rounded-md'
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>

              <div className='flex flex-col space-y-1'>
                <label>Address</label>
                <input
                  type='text'
                  placeholder='Enter your address'
                  className='p-2 rounded-md'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>

              <div className='flex w-full gap-5'>
                <div className='flex flex-col space-y-1 w-full'>
                  <label>State</label>
                  <input
                    type='text'
                    placeholder='Enter your state'
                    className='p-2 rounded-md w-full'
                    value={state}
                    onChange={e => setState(e.target.value)}
                  />
                </div>
                <div className='flex flex-col space-y-1 w-full'>
                  <label>PostCode</label>
                  <input
                    type='text'
                    placeholder='Enter your postcode'
                    className='p-2 rounded-md w-full'
                    value={postcode}
                    onChange={e => setPostcode(e.target.value)}
                  />
                </div>
              </div>

              <div className='flex w-full gap-5'>
                <div className='flex flex-col space-y-1 w-full'>
                  <label>Country</label>
                  <input
                    type='text'
                    placeholder='Enter your country'
                    className='p-2 rounded-md w-full'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                  />
                </div>
                <div className='flex flex-col space-y-1 w-full'>
                  <label>Phone No</label>
                  <input
                    type='text'
                    placeholder='Enter your Number'
                    className='p-2 rounded-md w-full'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <button
                className='bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer'
                onClick={handleConfirmOrder}
              >
                Submit
              </button>

              <div className='flex items-center justify-center w-full text-gray-700'>
                -----OR-----
              </div>

              <div className='flex justify-center'>
                <button
                  onClick={getLocation}
                  className='bg-red-500 text-white px-3 py-2 rounded-md'
                >
                  Detect Location
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
              <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>

              <div className='flex justify-between items-center'>
                <h1 className='flex gap-1 items-center text-gray-700'>
                  <LuNotebookText />
                  Items total
                </h1>
                <p>₹{totalPrice}</p>
              </div>

              <div className='flex justify-between items-center'>
                <h1 className='flex gap-1 items-center text-gray-700'>
                  <MdDeliveryDining />
                  Delivery Charge
                </h1>
                <p className='text-red-500 font-semibold'>
                  <span className='text-gray-600 line-through px-1'>₹5</span>
                  FREE
                </p>
              </div>

              <div className='flex justify-between items-center'>
                <h1 className='flex gap-1 items-center text-gray-700'>
                  <GiShoppingBag />
                  Handling Charge
                </h1>
                <p className='text-red-500 font-semibold'>₹3</p>
              </div>

              <hr className='text-gray-200 mt-2' />

              <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-lg'>Grand total</h1>
                <p className='font-semibold text-lg'>₹{totalPrice + 3}</p>
              </div>

              <button
                className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3'
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-red-500/80 font-bold text-5xl text-muted'>
            Oh no! Your cart is empty
          </h1>
          <img src={emptyCart} alt='' className='w-[400px]' />
          <button
            onClick={() => navigate('/products')}
            className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer'
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
