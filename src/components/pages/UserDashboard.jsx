import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link ইমপোর্ট করা হয়েছে
import { auth } from "../../firebase.config";
import {
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase.config";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firestoreData, setFirestoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resetMessage, setResetMessage] = useState({ type: "", message: "" });
  const [orders, setOrders] = useState([]);

  // Function: fetch extra user data
  const fetchFirestoreData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFirestoreData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
    }
    setLoading(false);
  };

  // Function: Realtime orders listener
  const fetchUserOrdersRealtime = (uid) => {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
      },
      (error) => {
        console.error("Realtime orders error:", error);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    let unsubscribeOrders = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFirestoreData(currentUser.uid);
        unsubscribeOrders = fetchUserOrdersRealtime(currentUser.uid);
      } else {
        navigate("/login");
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeOrders) unsubscribeOrders();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const handleSetPassword = async () => {
    if (!user || !user.email) {
      setResetMessage({ type: "error", message: "User email not found." });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetMessage({
        type: "success",
        message: "Password reset link sent to your email!",
      });
    } catch (error) {
      setResetMessage({
        type: "error",
        message: `Failed to send email: ${error.message}`,
      });
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-medium">Loading User Data...</p>
      </div>
    );
  }

  const displayName =
    user.displayName ||
    (firestoreData ? firestoreData.displayName : "Guest User");
  const email = user.email || (firestoreData ? firestoreData.email : "N/A");
  const photoURL = user.photoURL || "https://i.pravatar.cc/150";
  const isSocialLogin = user.providerData.some(
    (p) => p.providerId !== "password" && p.providerId !== "firebase"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <div className="flex flex-col items-center text-center">
            <img
              src={photoURL}
              className="w-24 h-24 rounded-full border-4 border-indigo-500"
              alt={displayName}
            />
            <h2 className="text-xl font-bold mt-3">{displayName}</h2>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>

          <ul className="mt-6 space-y-3">
            <li className="p-3 rounded-xl bg-indigo-50 text-indigo-600 font-semibold cursor-pointer">
              Dashboard
            </li>
            <li
              onClick={() => navigate("/dashboard/orders")}
              className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              Orders
            </li>
            <li className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer">
              Wishlist
            </li>
            <li
              onClick={() => navigate("/addresses")}
              className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              Address Book
            </li>
            <li className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer">
              Payment Methods
            </li>
            <li className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer">
              Settings
            </li>
            <li
              onClick={handleLogout}
              className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer text-red-500 font-semibold"
            >
              Logout
            </li>
          </ul>
        </div>

        {/* Main Panel */}
        <div className="md:col-span-3 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <h3 className="text-3xl font-bold text-indigo-600">
                {orders.length}
              </h3>
              <p className="text-gray-500">Total Orders</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <h3 className="text-3xl font-bold text-indigo-600">
                {
                  orders.filter(
                    (o) => o.status && o.status.toLowerCase() === "pending"
                  ).length
                }
              </h3>
              <p className="text-gray-500">Pending Orders</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <h3 className="text-3xl font-bold text-indigo-600">0</h3>
              <p className="text-gray-500">Wishlist Items</p>
            </div>
          </div>

          {resetMessage.message && (
            <div
              className={`p-4 rounded-xl font-medium ${
                resetMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {resetMessage.message}
            </div>
          )}

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Orders
            </h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2">Order ID</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* এখানে orders.totalAmount বা orders.total চেক করা হয়েছে */}
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b text-gray-700">
                      <td className="py-3">
                        <Link
                          to={`/dashboard/order/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          {order.id.substring(0, 8)}...
                        </Link>
                      </td>
                      <td className="py-3">{order.status}</td>
                      <td className="py-3 font-semibold">
                        {order.totalAmount || order.total || "N/A"} TK
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          to={`/dashboard/order/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="p-4 bg-gray-100 rounded-xl hover:bg-indigo-50 font-medium">
                Edit Profile
              </button>
              {isSocialLogin ? (
                <button
                  onClick={handleSetPassword}
                  className="p-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 font-medium border border-indigo-200"
                >
                  Set Password
                </button>
              ) : (
                <button
                  onClick={handleSetPassword}
                  className="p-4 bg-gray-100 rounded-xl hover:bg-indigo-50 font-medium"
                >
                  Change Password
                </button>
              )}
              <button className="p-4 bg-gray-100 rounded-xl hover:bg-indigo-50 font-medium">
                Manage Address
              </button>
              <button className="p-4 bg-gray-100 rounded-xl hover:bg-indigo-50 font-medium">
                Payment Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
