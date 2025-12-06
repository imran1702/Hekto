// src/pages/OrderHistory.js
import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase.config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (!auth.currentUser) {
    return <p className="text-center mt-10 text-red-500">Please login to view your orders.</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center mt-10 text-gray-600">You have no orders yet.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order ID:</span>
              <span>{order.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Status:</span>
              <span className="text-blue-600">{order.status}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Items:</span>
              <ul className="list-disc pl-6">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} × {item.qun} — {item.price * item.qun} TK
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>{order.total} TK</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
