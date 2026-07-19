import React, { useEffect, useState } from 'react'
import OrderNavbar from './ordernavber'
import OwnerNavbar from './navbertoowner';
import api from '../api';

export const Pendingorder = () => {
  const [order, setorder] = useState([]); // ✅ array not string
  const [loading, setLoading] = useState(false);

  const orderSchema = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/owner/orders?status=pending`, { withCredentials: true });

      // console.log("API response:", res.data);

      // ✅ Adjust depending on API shape
      if (Array.isArray(res.data)) {
        setorder(res.data);
      } else if (res.data.orders) {
        setorder(res.data.orders);
      } else {
        setorder([res.data]);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    orderSchema();
  }, []);

  const cancel = async (id) => {
    try {
      const res = await api.post(
        "/api/owner/ordercancel",
        { id },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert(res.data.message);
        orderSchema(); // Refresh pending orders
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const groupedOrders = [...order]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .reduce((groups, item) => {
      const date = new Date(item.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(item);
      return groups;
    }, {});

  return (
    <>
      <OwnerNavbar />
      <OrderNavbar />
      <div className="mb-2 md:mb-3 lg:mb-3 w-[95%] mx-auto">
        {loading && (
          <p className="text-2xl font-bold text-center py-10">Loading...</p>
        )}

        {!loading && order.length === 0 ? (
          <p className="text-xl font-semibold text-center py-10">
            No pending Orders Found
          </p>
        ) : (
          Object.entries(groupedOrders).map(([date, orders]) => (
            <div key={date} className="mb-8">

              {/* Date Heading */}
              <div className="sticky top-0 bg-gray-100 py-3 px-4 rounded-lg mb-4 shadow">
                <h2 className="text-2xl font-bold text-blue-700">
                  📅 {date}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >

                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-lg">
                            {order.orderId || "KOCART"}
                          </h3>

                          <p className="text-sm opacity-90">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                        <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                          {order.status}
                        </span>
                        <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                          {order.deliveryBoy?.name || `null`}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4">

                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">
                          Total
                        </p>

                        <p className="text-xl font-bold text-green-600">
                          ₹{order.totalAmount}
                        </p>
                      </div>

                      {/* Merchant */}
                      <div className="border rounded-lg p-3 mb-4 bg-gray-50">
                        <h3 className="font-bold text-blue-700 mb-2">
                          Merchant
                        </h3>

                        {order.shop?.map((shop, index) => (
                          <div key={index} className="mb-4">

                            <p>
                              <b>Shop:</b> {shop.admin.companyName || `kocart`}
                            </p>

                            <p>
                              <b>Phone:</b> {shop.admin.number || `kocart`}
                            </p>

                            <a
                              href={
                                shop.admin?.location?.coordinates
                                  ? `https://www.google.com/maps/dir/?api=1&destination=${shop.admin.location.coordinates[1]},${shop.admin.location.coordinates[0]}`
                                  : "#"
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 underline"
                            >
                              View Location
                            </a>

                            <div className="grid grid-cols-2 gap-3 mt-3">

                              {shop.items?.map((item) => (
                                <div
                                  key={item._id}
                                  className="border rounded-lg p-2 text-center"
                                >

                                  <img
                                    src={item.productId?.image?.[0]}
                                    className="w-24 h-24 object-cover rounded mx-auto"
                                  />

                                  <p className="font-semibold mt-2">
                                    {item.productId?.name}
                                  </p>

                                  <p>Qty : {item.quantity}</p>

                                  <p className="text-green-600 font-bold">
                                    ₹{item.price}
                                  </p>

                                </div>
                              ))}

                            </div>

                            <p className="mt-3 font-bold text-right">
                              Shop Total : ₹{shop.subtotal}
                            </p>

                          </div>
                        ))}

                      </div>

                      {/* Customer */}
                      {order.userId && (
                        <div className="border rounded-lg p-3 bg-gray-50">

                          <h3 className="font-bold text-green-700 mb-2">
                            Customer
                          </h3>

                          <p>
                            <b>Phone:</b> {order.number}
                          </p>

                          <a
                            href={
                              order.userId?.location?.coordinates
                                ? `https://www.google.com/maps/dir/?api=1&destination=${order.userId.location.coordinates[1]},${order.userId.location.coordinates[0]}`
                                : "#"
                            } target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Customer Location
                          </a>

                        </div>
                      )}

                    </div>

                    {/* Bottom Buttons */}
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to cancel this order?")) {
                            cancel(order._id);
                          }
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))
        )}
      </div>
    </>

  )
}
