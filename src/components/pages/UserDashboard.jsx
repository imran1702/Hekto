import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  // নতুন state যোগ করা হলো মেনু টগল করার জন্য
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-xl font-medium">Loading User Data...</p>
        </div>
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        {/* small screens: full width, medium screens: 1/4 width */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 md:p-6 h-fit md:sticky md:top-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={photoURL}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-indigo-500 object-cover"
              alt={displayName}
            />
            <h2 className="text-lg sm:text-xl font-bold mt-3 text-gray-800 line-clamp-1">
              {displayName}
            </h2>
            <p className="text-gray-500 text-sm break-all">{email}</p>
          </div>

          <ul className="mt-6 space-y-2 text-sm sm:text-base">
            {/* 🎯 Dashboard (Always visible, handles toggle on small screens) */}
            <li
              onClick={toggleMenu} // Add toggle function
              className="p-3 rounded-xl bg-indigo-50 text-indigo-600 font-semibold cursor-pointer transition flex justify-between items-center"
            >
              Dashboard
              {/* Menu icon for mobile */}
              <svg
                className={`w-4 h-4 text-indigo-600 md:hidden transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            {/* 🎯 Other Menu Items (Hidden by default on mobile, shown on toggle or on MD screens and up) */}
            <div
              className={`md:block ${
                isMenuOpen ? "block" : "hidden"
              } space-y-2`}
            >
              <li
                onClick={() => navigate("/dashboard/orders")}
                className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
              >
                Orders
              </li>
              <li className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition">
                Wishlist
              </li>
              <li
                onClick={() => navigate("/addresses")}
                className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
              >
                Address Book
              </li>
              <li className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition">
                Payment Methods
              </li>
              <li className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition">
                Settings
              </li>
              <li
                onClick={handleLogout}
                className="p-3 rounded-xl hover:bg-red-50 cursor-pointer text-red-500 font-semibold transition"
              >
                Logout
              </li>
            </div>
          </ul>
        </div>

        {/* Main Panel */}
        {/* small screens: full width, medium screens: 3/4 width */}
        <div className="md:col-span-3 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome, {displayName}!
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600">
                {orders.length}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">Total Orders</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600">
                {
                  orders.filter(
                    (o) => o.status && o.status.toLowerCase() === "pending"
                  ).length
                }
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Pending Orders
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow text-center hidden sm:block">
              {/* Hide on extra small screens for cleaner look */}
              <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600">
                0
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Wishlist Items
              </p>
            </div>
          </div>

          {resetMessage.message && (
            <div
              className={`p-4 rounded-xl font-medium text-sm sm:text-base ${
                resetMessage.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {resetMessage.message}
            </div>
          )}

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Orders
            </h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No recent orders found.</p>
            ) : (
              <table className="w-full text-left table-auto min-w-[500px]">
                {" "}
                {/* min-w added for scroll on small screen */}
                <thead>
                  <tr className="text-gray-500 border-b text-sm">
                    <th className="py-2 px-1 sm:px-3">Order ID</th>
                    <th className="py-2 hidden sm:table-cell">Date</th>{" "}
                    {/* Hide Date on small screen */}
                    <th className="py-2 px-1 sm:px-3">Status</th>
                    <th className="py-2 px-1 sm:px-3">Amount</th>
                    <th className="py-2 px-1 sm:px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr
                      key={order.id}
                      className="border-b text-gray-700 text-sm"
                    >
                      <td className="py-3 px-1 sm:px-3">
                        <Link
                          to={`/dashboard/order/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          {order.id.substring(0, 6)}...
                        </Link>
                      </td>
                      <td className="py-3 hidden sm:table-cell">
                        {order.createdAt?.toDate().toLocaleDateString() ||
                          "N/A"}
                      </td>
                      <td className="py-3 px-1 sm:px-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-1 sm:px-3 font-semibold">
                        {parseFloat(
                          order.totalAmount || order.total || 0
                        ).toFixed(2)}{" "}
                        TK
                      </td>
                      <td className="py-3 px-1 sm:px-3 text-right">
                        <Link
                          to={`/dashboard/order/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-sm sm:text-base">
              <button className="p-3 sm:p-4 bg-gray-100 rounded-xl hover:bg-indigo-50 font-medium transition">
                Edit Profile
              </button>
              {isSocialLogin ? (
                <button
                  onClick={handleSetPassword}
                  className="p-3 sm:p-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 font-medium border border-indigo-200 transition"
                >
                  Set Password
                </button>
              ) : (
                <button
                  onClick={handleSetPassword}
                  className="p-3 sm:p-4 bg-gray-100 rounded-xl hover:bg-indigo-50 font-medium transition"
                >
                  Change Password
                </button>
              )}
              <button className="p-3 sm:p-4 bg-gray-100 rounded-xl hover:bg-indigo-50 font-medium">
                Manage Address
              </button>
              <button className="p-3 sm:p-4 bg-gray-100 rounded-xl hover:bg-indigo-50 font-medium">
                Payment Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
