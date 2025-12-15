import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase.config"; // ⚠️ আপনার firebase.config ফাইলের সঠিক পাথ দিন
import { doc, getDoc } from "firebase/firestore";
import Container from "../Container"; // আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী পাথ ঠিক করে নেবেন
import { FaArrowLeft, FaMapMarkerAlt, FaUser, FaBox } from "react-icons/fa";

const OrderDetail = () => {
  // URL থেকে :orderId প্যারামিটারটি আনা হলো
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("Invalid order ID.");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        // Firebase Firestore থেকে নির্দিষ্ট ID-এর ডকুমেন্ট আনা
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Order not found.");
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]); // orderId পরিবর্তন হলে আবার লোড হবে // --- রেন্ডারিং লজিক ---

  if (loading) {
    return (
      <Container>
               {" "}
        <div className="py-20 text-center text-xl font-josefin text-[#FB2E86]">
                    Loading Order Details...        {" "}
        </div>
             {" "}
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
               {" "}
        <div className="py-20 text-center text-xl font-josefin text-red-600">
                    Error: {error}       {" "}
        </div>
               {" "}
        <div className="text-center">
                   {" "}
          <Link
            to="/dashboard"
            className="text-[#1D3178] hover:text-[#FB2E86] flex items-center justify-center font-semibold"
          >
                        <FaArrowLeft className="mr-2" /> Back to Dashboard      
               {" "}
          </Link>
                 {" "}
        </div>
             {" "}
      </Container>
    );
  } // Date Formatting

  const orderDate = order.createdAt?.toDate
    ? order.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A"; // Status Color Logic

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Processing":
        return "bg-blue-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Container>
           {" "}
      <div className="py-8 sm:py-12">
                {/* Header Section - Responsive Stack */}       {" "}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
                   {" "}
          <h1 className="text-[#1D3178] text-2xl sm:text-3xl font-bold font-josefin">
                        Order Details          {" "}
          </h1>
                   {" "}
          <Link
            to="/dashboard"
            className="text-[#1D3178] hover:text-[#FB2E86] flex items-center font-semibold text-sm sm:text-base transition duration-200"
          >
                        <FaArrowLeft className="mr-2" /> Back to Dashboard      
               {" "}
          </Link>
                 {" "}
        </div>
               {" "}
        <div className="bg-[#F8F8FD] p-4 sm:p-6 rounded-lg shadow-lg">
                    {/* Header: Order ID and Status */}         {" "}
          <div className="border-b pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                       {" "}
            <div>
                           {" "}
              <p className="text-xs sm:text-sm font-lato text-[#A1A8C1]">
                Order ID
              </p>
                           {" "}
              <h2 className="text-lg sm:text-xl font-bold text-[#1D3178] font-josefin break-all">
                                {order.id}             {" "}
              </h2>
                         {" "}
            </div>
                       {" "}
            <span
              className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-full text-center min-w-[100px] ${getStatusClasses(
                order.status
              )}`}
            >
                            {order.status}           {" "}
            </span>
                     {" "}
          </div>
                    {/* Meta Information - Responsive Grid */}         {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 text-[#1D3178]">
                        {/* Order Date */}           {" "}
            <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm flex items-start">
                           {" "}
              <FaBox className="text-[#FB2E86] text-xl sm:text-2xl mr-3 shrink-0 mt-1" />
                           {" "}
              <div>
                               {" "}
                <p className="text-xs font-lato font-semibold">Order Date</p>   
                           {" "}
                <p className="text-sm font-bold break-words">{orderDate}</p>   
                         {" "}
              </div>
                         {" "}
            </div>
                        {/* Customer */}           {" "}
            <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm flex items-start">
                           {" "}
              <FaUser className="text-[#FB2E86] text-xl sm:text-2xl mr-3 shrink-0 mt-1" />
                           {" "}
              <div>
                               {" "}
                <p className="text-xs font-lato font-semibold">Customer</p>     
                         {" "}
                <p className="text-sm font-bold break-words">
                  {order.customerName}
                </p>
                             {" "}
              </div>
                         {" "}
            </div>
                        {/* Shipping Address */}           {" "}
            <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm flex items-start lg:col-span-1 md:col-span-2">
                           {" "}
              <FaMapMarkerAlt className="text-[#FB2E86] text-xl sm:text-2xl mr-3 shrink-0 mt-1" />
                           {" "}
              <div>
                               {" "}
                <p className="text-xs font-lato font-semibold">
                                    Shipping Address                {" "}
                </p>
                               {" "}
                <p className="text-sm break-words">
                                    {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},                  {" "}
                  {order.shippingAddress.postalCode}               {" "}
                </p>
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
                    {/* Products and Summary - Responsive Grid */}         {" "}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                       {" "}
            {/* Product List (2/3 width on LG+, full width on small/medium) */} 
                     {" "}
            <div className="lg:col-span-2 bg-white p-4 sm:p-5 rounded-md shadow-sm">
                           {" "}
              <h3 className="text-lg sm:text-xl font-semibold mb-4 border-b pb-2 text-[#1D3178]">
                                Products Ordered ({order.totalQuantity})        
                     {" "}
              </h3>
                           {" "}
              <div className="space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-2">
                               {" "}
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-100 pb-3"
                  >
                                       {" "}
                    <div className="flex items-start gap-3 w-3/4">
                      {" "}
                      {/* Added w-3/4 to manage space */}                     {" "}
                      {/* <img src={item.image_path} alt={item.name} className="w-12 h-12 object-cover rounded" /> */}
                                           {" "}
                      <div>
                                               {" "}
                        <p className="text-sm font-bold text-[#1D3178] line-clamp-2">
                                                    {item.name}                 
                               {" "}
                        </p>
                                               {" "}
                        <p className="text-xs text-[#A1A8C1]">
                                                    Qty: {item.qun} x{" "}
                          {parseFloat(item.price).toFixed(2)} TK                
                                 {" "}
                        </p>
                                             {" "}
                      </div>
                                         {" "}
                    </div>
                                       {" "}
                    <p className="text-[#FB2E86] font-bold text-sm shrink-0">
                                           {" "}
                      {parseFloat(item.subtotal).toFixed(2)} TK                
                         {" "}
                    </p>
                                     {" "}
                  </div>
                ))}
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            {/* Order Summary (1/3 width on LG+, full width on small/medium) */}
                       {" "}
            <div className="lg:col-span-1 bg-white p-4 sm:p-5 rounded-md shadow-sm h-fit">
                           {" "}
              <h3 className="text-lg sm:text-xl font-semibold mb-4 border-b pb-2 text-[#1D3178]">
                                Summary              {" "}
              </h3>
                           {" "}
              <div className="space-y-3">
                               {" "}
                <div className="flex justify-between text-sm text-[#1D3178] font-lato">
                                    <span>Subtotal:</span>                 {" "}
                  <span className="font-bold">
                                       {" "}
                    {parseFloat(order.totalAmount - 50).toFixed(2)} TK          
                           {" "}
                  </span>{" "}
                                    {/* Assuming 50 TK fixed shipping */}       
                         {" "}
                </div>
                               {" "}
                <div className="flex justify-between text-sm text-[#1D3178] font-lato">
                                    <span>Shipping:</span>                 {" "}
                  <span className="font-bold">50.00 TK</span>               {" "}
                </div>
                               {" "}
                <div className="flex justify-between text-base sm:text-lg pt-3 border-t border-gray-200 mt-3">
                                   {" "}
                  <span className="font-bold text-[#1D3178] font-josefin">
                                        Grand Total:                  {" "}
                  </span>
                                   {" "}
                  <span className="font-bold text-[#FB2E86]">
                                       {" "}
                    {parseFloat(order.totalAmount).toFixed(2)} TK              
                       {" "}
                  </span>
                                 {" "}
                </div>
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </Container>
  );
};

export default OrderDetail;
