// import React, { useEffect, useState } from "react";
// import { db } from "../firebase/config";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";

// const MyOrders = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search past orders

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         if (!user) return;
//         const q = query(collection(db, "orders"), where("userId", "==", user.uid));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   // ✅ Show loading animation to prevent footer jump
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh]">
//         <video
//           src="/src/assets/Loading4.webm"
//           autoPlay
//           loop
//           muted
//           className="w-32 h-32"
//         />
//       </div>
//     );
//   }

//   // ✅ Separate orders: current (not delivered & not cancelled) & past (delivered or cancelled)
//   const currentOrders = orders.filter(
//     (order) => order.status !== "Delivered" && order.status !== "Cancelled"
//   );
//   const pastOrders = orders.filter(
//     (order) => order.status === "Delivered" || order.status === "Cancelled"
//   );

//   // ✅ Search filter for past orders
//   const filteredPastOrders = pastOrders.filter((order) =>
//     order.items.some((item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // ✅ No orders case
//   if (currentOrders.length === 0 && pastOrders.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-[70vh]">
//         <video
//           src="/src/assets/No_order.webm.webm"
//           autoPlay
//           loop
//           muted
//           className="w-80 h-80"
//         />
//       </div>
//     );
//   }

//   const formatDate = (timestamp) => {
//     if (!timestamp) return "";
//     const date = timestamp.toDate();
//     return date.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const statusSteps = ["Pending", "Confirmed", "On The Way", "Delivered"];
//   const getStepIndex = (status) => statusSteps.indexOf(status);

//   return (
//     <div className="max-w-5xl mx-auto px-2 sm:px-4 py-6 min-h-[70vh]">
//       {/* ✅ Current Orders Section */}
//       {currentOrders.length > 0 && (
//         <>
//           <h1 className="text-2xl font-bold mb-4">Current Orders</h1>
//           <div className="space-y-6">
//             {currentOrders.map((order) => {
//               const combinedItems = order.items.reduce((acc, item) => {
//                 const existing = acc.find((i) => i.id === item.id);
//                 if (existing) {
//                   existing.cartQuantity =
//                     (existing.cartQuantity ?? 1) + (item.cartQuantity ?? 1);
//                   existing.totalItemPrice =
//                     (existing.totalItemPrice ?? existing.price) +
//                     (item.totalItemPrice ?? item.price);
//                 } else {
//                   acc.push({
//                     ...item,
//                     cartQuantity: item.cartQuantity ?? 1,
//                     totalItemPrice:
//                       item.totalItemPrice ??
//                       (item.price ?? 0) * (item.cartQuantity ?? 1),
//                   });
//                 }
//                 return acc;
//               }, []);

//               const totalItemsCount = combinedItems.reduce(
//                 (sum, item) => sum + item.cartQuantity,
//                 0
//               );

//               return (
//                 <div
//                   key={order.id}
//                   className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4"
//                 >
//                   {/* Header */}
//                   <div className="flex flex-wrap justify-between items-center gap-2">
//                     <h2 className="font-bold text-lg">
//                       Order #{order.id.slice(0, 8)}
//                     </h2>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         order.status === "Pending"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : order.status === "Confirmed"
//                           ? "bg-blue-100 text-blue-700"
//                           : order.status === "On The Way"
//                           ? "bg-purple-100 text-purple-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>

//                   {/* Items */}
//                   <div className="space-y-3">
//                     {combinedItems.map((item, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between border-b pb-2 last:border-b-0"
//                       >
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={item.imageUrl}
//                             alt={item.name}
//                             className="w-14 h-14 object-cover rounded-md"
//                           />
//                           <div>
//                             <p className="font-medium">{item.name}</p>
//                             <p className="text-xs text-gray-500">
//                               {item.quantityInfo
//                                 ? `${item.quantityInfo} • Qty: ${item.cartQuantity}`
//                                 : `Qty: ${item.cartQuantity}`}
//                             </p>
//                             <p className="text-sm font-semibold text-gray-700">
//                               ₹{item.totalItemPrice}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Total, Address, Date */}
//                   <div className="mt-3 text-sm text-gray-600">
//                     <p className="font-medium">
//                       {totalItemsCount} item
//                       {totalItemsCount > 1 && "s"} • Grand Total:{" "}
//                       <span className="text-black font-bold">
//                         ₹{order.grandTotal ?? order.totalPrice ?? 0}
//                       </span>
//                     </p>
//                     <p>📅 Placed on: {formatDate(order.date)}</p>
//                     <p>
//                       🏠 Address:{" "}
//                       {order.address
//                         ? `${order.address.fullName}, ${order.address.address}, ${order.address.state}, ${order.address.postcode}, ${order.address.country}, Phone: ${order.address.phone}`
//                         : "No address found"}
//                     </p>
//                   </div>

//                   {/* Progress Bar */}
//                   {order.status !== "Delivered" && (
//                     <div className="flex flex-col gap-2 mt-3">
//                       <div className="flex items-center justify-between">
//                         {statusSteps.map((step, index) => {
//                           const isActive = index <= getStepIndex(order.status);
//                           return (
//                             <div
//                               key={step}
//                               className="flex-1 flex flex-col items-center"
//                             >
//                               <div
//                                 className={`h-2 w-full rounded-full ${
//                                   isActive ? "bg-blue-500" : "bg-gray-200"
//                                 }`}
//                               ></div>
//                               <p
//                                 className={`text-xs mt-1 ${
//                                   isActive ? "text-blue-600" : "text-gray-400"
//                                 }`}
//                               >
//                                 {step}
//                               </p>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}

//       {/* ✅ Past Orders Section (Delivered & Cancelled) */}
//       {pastOrders.length > 0 && (
//         <>
//           {/* Search Bar */}
//           <div className="flex flex-wrap justify-between items-center mt-10 mb-4 gap-3">
//             <h1 className="text-2xl font-bold">Past Orders</h1>
//             <input
//               type="text"
//               placeholder="Search past orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border px-3 py-2 rounded-lg w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div className="space-y-6">
//             {filteredPastOrders.length > 0 ? (
//               filteredPastOrders.map((order) => {
//                 const combinedItems = order.items.reduce((acc, item) => {
//                   const existing = acc.find((i) => i.id === item.id);
//                   if (existing) {
//                     existing.cartQuantity =
//                       (existing.cartQuantity ?? 1) + (item.cartQuantity ?? 1);
//                     existing.totalItemPrice =
//                       (existing.totalItemPrice ?? existing.price) +
//                       (item.totalItemPrice ?? item.price);
//                   } else {
//                     acc.push({
//                       ...item,
//                       cartQuantity: item.cartQuantity ?? 1,
//                       totalItemPrice:
//                         item.totalItemPrice ??
//                         (item.price ?? 0) * (item.cartQuantity ?? 1),
//                     });
//                   }
//                   return acc;
//                 }, []);

//                 const totalItemsCount = combinedItems.reduce(
//                   (sum, item) => sum + item.cartQuantity,
//                   0
//                 );

//                 return (
//                   <div
//                     key={order.id}
//                     className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4"
//                   >
//                     {/* Header with Cancelled Handling */}
//                     <div className="flex flex-wrap justify-between items-center">
//                       <h2 className="font-bold text-lg">
//                         Order #{order.id.slice(0, 8)}
//                       </h2>
//                       {order.status === "Cancelled" ? (
//                         <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
//                           Cancelled ❌
//                         </span>
//                       ) : (
//                         <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
//                           Delivered ✔
//                         </span>
//                       )}
//                     </div>

//                     {/* Items */}
//                     <div className="space-y-3">
//                       {combinedItems.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between border-b pb-2 last:border-b-0"
//                         >
//                           <div className="flex items-center gap-3">
//                             <img
//                               src={item.imageUrl}
//                               alt={item.name}
//                               className="w-14 h-14 object-cover rounded-md"
//                             />
//                             <div>
//                               <p className="font-medium">{item.name}</p>
//                               <p className="text-xs text-gray-500">
//                                 {item.quantityInfo
//                                   ? `${item.quantityInfo} • Qty: ${item.cartQuantity}`
//                                   : `Qty: ${item.cartQuantity}`}
//                               </p>
//                               <p className="text-sm font-semibold text-gray-700">
//                                 ₹{item.totalItemPrice}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Footer with Cancel Reason */}
//                     <div className="mt-3 text-sm text-gray-600">
//                       <p className="font-medium">
//                         {totalItemsCount} item
//                         {totalItemsCount > 1 && "s"} • Grand Total:{" "}
//                         <span className="text-black font-bold">
//                           ₹{order.grandTotal ?? order.totalPrice ?? 0}
//                         </span>
//                       </p>
//                       <p>
//                         {order.status === "Cancelled"
//                           ? `❗ Reason: ${
//                               order.cancelReason ?? "Item out of stock"
//                             }`
//                           : `Delivered on: ${formatDate(
//                               order.deliveredDate ?? order.date
//                             )}`}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-gray-500 text-center">
//                 No orders found matching "{searchTerm}"
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search past orders

     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;
        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Sort orders by date (newest first)
        const sorted = data.sort((a, b) => {
          const dateA = a.deliveredDate?.toDate?.() || a.date?.toDate?.() || new Date(0);
          const dateB = b.deliveredDate?.toDate?.() || b.date?.toDate?.() || new Date(0);
          return dateB - dateA; // Newest first
        });

        setOrders(sorted);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // ✅ Show loading animation to prevent footer jump
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <video
          src="/src/assets/Loading4.webm"
          autoPlay
          loop
          muted
          className="w-32 h-32"
        />
      </div>
    );
  }

  // ✅ Separate orders: current (not delivered & not cancelled) & past (delivered or cancelled)
  const currentOrders = orders.filter(
    (order) => order.status !== "Delivered" && order.status !== "Cancelled"
  );
  const pastOrders = orders.filter(
    (order) => order.status === "Delivered" || order.status === "Cancelled"
  );

  // ✅ Search filter for past orders
  const filteredPastOrders = pastOrders.filter((order) =>
    order.items.some((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ✅ No orders case
  if (currentOrders.length === 0 && pastOrders.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <video
          src="/src/assets/No_order.webm.webm"
          autoPlay
          loop
          muted
          className="w-80 h-80"
        />
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusSteps = ["Pending", "Confirmed", "On The Way", "Delivered"];
  const getStepIndex = (status) => statusSteps.indexOf(status);



  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-6 min-h-[70vh]">
      {/* ✅ Current Orders Section */}
      {currentOrders.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Current Orders</h1>
          <div className="space-y-6">
            {currentOrders.map((order) => {
              const combinedItems = order.items.reduce((acc, item) => {
                const existing = acc.find((i) => i.id === item.id);
                if (existing) {
                  existing.cartQuantity =
                    (existing.cartQuantity ?? 1) + (item.cartQuantity ?? 1);
                  existing.totalItemPrice =
                    (existing.totalItemPrice ?? existing.price) +
                    (item.totalItemPrice ?? item.price);
                } else {
                  acc.push({
                    ...item,
                    cartQuantity: item.cartQuantity ?? 1,
                    totalItemPrice:
                      item.totalItemPrice ??
                      (item.price ?? 0) * (item.cartQuantity ?? 1),
                  });
                }
                return acc;
              }, []);

              const totalItemsCount = combinedItems.reduce(
                (sum, item) => sum + item.cartQuantity,
                0
              );

              return (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4"
                >
                  {/* Header */}
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h2 className="font-bold text-lg">
                      Order #{order.id.slice(0, 8)}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "On The Way"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {combinedItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-md"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.quantityInfo
                                ? `${item.quantityInfo} • Qty: ${item.cartQuantity}`
                                : `Qty: ${item.cartQuantity}`}
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                              ₹{item.totalItemPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total, Address, Date */}
                  <div className="mt-3 text-sm text-gray-600">
                    <p className="font-medium">
                      {totalItemsCount} item
                      {totalItemsCount > 1 && "s"} • Grand Total:{" "}
                      <span className="text-black font-bold">
                        ₹{order.grandTotal ?? order.totalPrice ?? 0}
                      </span>
                    </p>
                    <p>📅 Placed on: {formatDate(order.date)}</p>
                    <p>
                      🏠 Address:{" "}
                      {order.address
                        ? `${order.address.fullName}, ${order.address.address}, ${order.address.state}, ${order.address.postcode}, ${order.address.country}, Phone: ${order.address.phone}`
                        : "No address found"}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  {order.status !== "Delivered" && (
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="flex items-center justify-between">
                        {statusSteps.map((step, index) => {
                          const isActive = index <= getStepIndex(order.status);
                          return (
                            <div
                              key={step}
                              className="flex-1 flex flex-col items-center"
                            >
                              <div
                                className={`h-2 w-full rounded-full ${
                                  isActive ? "bg-blue-500" : "bg-gray-200"
                                }`}
                              ></div>
                              <p
                                className={`text-xs mt-1 ${
                                  isActive ? "text-blue-600" : "text-gray-400"
                                }`}
                              >
                                {step}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ✅ Past Orders Section */}
      {pastOrders.length > 0 && (
        <>
          {/* Search Bar */}
          <div className="flex flex-wrap justify-between items-center mt-10 mb-4 gap-3">
            <h1 className="text-2xl font-bold">Past Orders</h1>
            <input
              type="text"
              placeholder="Search past orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-6">
            {filteredPastOrders.length > 0 ? (
              filteredPastOrders.map((order) => {
                const combinedItems = order.items.reduce((acc, item) => {
                  const existing = acc.find((i) => i.id === item.id);
                  if (existing) {
                    existing.cartQuantity =
                      (existing.cartQuantity ?? 1) + (item.cartQuantity ?? 1);
                    existing.totalItemPrice =
                      (existing.totalItemPrice ?? existing.price) +
                      (item.totalItemPrice ?? item.price);
                  } else {
                    acc.push({
                      ...item,
                      cartQuantity: item.cartQuantity ?? 1,
                      totalItemPrice:
                        item.totalItemPrice ??
                        (item.price ?? 0) * (item.cartQuantity ?? 1),
                    });
                  }
                  return acc;
                }, []);

                const totalItemsCount = combinedItems.reduce(
                  (sum, item) => sum + item.cartQuantity,
                  0
                );

                return (
                  <div
                    key={order.id}
                    className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center">
                      <h2 className="font-bold text-lg">
                        Order #{order.id.slice(0, 8)}
                      </h2>
                      {order.status === "Cancelled" ? (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                          Cancelled ❌
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          Delivered ✔
                        </span>
                      )}
                    </div>

                    {/* Items */}
                    <div className="space-y-3">
                      {combinedItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b pb-2 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-14 h-14 object-cover rounded-md"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                {item.quantityInfo
                                  ? `${item.quantityInfo} • Qty: ${item.cartQuantity}`
                                  : `Qty: ${item.cartQuantity}`}
                              </p>
                              <p className="text-sm font-semibold text-gray-700">
                                ₹{item.totalItemPrice}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="font-medium">
                        {totalItemsCount} item
                        {totalItemsCount > 1 && "s"} • Grand Total:{" "}
                        <span className="text-black font-bold">
                          ₹{order.grandTotal ?? order.totalPrice ?? 0}
                        </span>
                      </p>
                      <p>
                        {order.status === "Cancelled"
                          ? `❗ Reason: ${order.cancelReason ?? "Item out of stock"}`
                          : `Delivered on: ${formatDate(
                              order.deliveredDate ?? order.date
                            )}`}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">
                No orders found matching "{searchTerm}"
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
