import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase.config"; // ⚠️ আপনার firebase.config ফাইলের সঠিক পাথ দিন
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom"; // Link ব্যবহার করার জন্য এটি ইমপোর্ট করা হলো

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // ১. ইউজার স্টেট লোড করা
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  // ২. ইউজার লগইন করলে Firebase থেকে অর্ডার লোড করা
  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // বর্তমান ইউজার আইডি অনুযায়ী কোয়েরি (Query) তৈরি করা
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", currentUser.uid), // শুধুমাত্র এই ইউজারের অর্ডার দেখাবে
      orderBy("createdAt", "desc") // নতুন অর্ডার আগে দেখাবে
    );

    // রিয়াল-টাইম লিসেনার সেট করা (onSnapshot)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders: ", error);
        setLoading(false);
      }
    );

    // কম্পোনেন্ট আনমাউন্ট হলে লিসেনার বন্ধ করা
    return () => unsubscribe();
  }, [currentUser]); // currentUser চেঞ্জ হলে useEffect আবার চলবে

  // --- রেন্ডারিং লজিক ---

  if (loading) {
    return (
      <div className="text-center py-10 text-[#FB2E86]">Loading Orders...</div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-[#1D3178] font-semibold">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-[#1D3178] font-josefin">
        Your Orders ({orders.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F8F8FD]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                {/* 🎯 এইখানে Link বসানো হলো */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1D3178]">
                  <Link
                    to={`/dashboard/order/${order.id}`}
                    className="text-blue-600 hover:text-[#FB2E86] font-semibold transition duration-200"
                  >
                    {order.id.substring(0, 8)}... (Details)
                  </Link>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* Firebase Timestamp কে Date অবজেক্টে কনভার্ট করা */}
                  {order.createdAt?.toDate
                    ? order.createdAt.toDate().toLocaleDateString("en-US")
                    : "N/A"}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-semibold`}
                >
                  <span
                    className={`px-2 inline-flex text-xs leading-5 rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#FB2E86]">
                  {order.totalAmount} TK
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.totalQuantity} items
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOrders;
