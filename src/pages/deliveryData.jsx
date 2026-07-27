import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const DeliveryList = () => {
  const [delivery, setDelivery] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getDeliveryPartners();
  }, []);

  const getDeliveryPartners = async () => {
    try {
      const res = await api.get("/api/owner/getdeliveryData");

      if (res.data.success) {
        setDelivery(res.data.deliveryboys);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🚚 Delivery Partners
      </h1>

      {/* Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-gray-500 text-sm">Partners</p>
          <h2 className="text-3xl font-bold">{delivery.length}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-gray-500 text-sm">Online</p>
          <h2 className="text-3xl font-bold text-green-600">
            {delivery.filter((d) => d.isOnline).length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-gray-500 text-sm">Available</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {delivery.filter((d) => d.isAvailable).length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-gray-500 text-sm">Busy</p>
          <h2 className="text-3xl font-bold text-orange-600">
            {delivery.filter((d) => !d.isAvailable).length}
          </h2>
        </div>

      </div>

      {delivery.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          No Delivery Partners Found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {delivery.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg border hover:shadow-xl transition p-6"
            >

              {/* Name */}
              <h2 className="text-xl font-bold text-gray-800">
                {item.name || "Delivery Partner"}
              </h2>

              <p className="text-sm text-gray-500 break-all">
                {item._id}
              </p>

              {/* Status */}
              <div className="flex justify-between mt-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.isOnline
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.isOnline ? "🟢 Online" : "🔴 Offline"}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.isAvailable
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.isAvailable ? "✅ Available" : "🚚 Busy"}
                </span>

              </div>

              {/* Details */}
              <div className="mt-5 space-y-2 text-sm">

                <p>
                  📧 <strong>Email:</strong> {item.email || "-"}
                </p>

                <p>
                  📞 <strong>Phone:</strong> {item.Number || "-"}
                </p>

              </div>

              {/* Balance Cards */}
              <div className="grid grid-cols-3 gap-3 mt-6">

                <div className="bg-yellow-50 rounded-xl border p-3 text-center">
                  <p className="text-xs text-gray-500">KOCART</p>

                  <h3 className="font-bold text-yellow-700">
                    ₹{Number(item.kocartAmount || 0).toFixed(2)}
                  </h3>
                </div>

                <div className="bg-green-50 rounded-xl border p-3 text-center">
                  <p className="text-xs text-gray-500">Earnings</p>

                  <h3 className="font-bold text-green-700">
                    ₹{Number(item.deliveryBoyAmount || 0).toFixed(2)}
                  </h3>
                </div>

                <div className="bg-blue-50 rounded-xl border p-3 text-center">
                  <p className="text-xs text-gray-500">Settlement</p>

                  <h3 className="font-bold text-blue-700">
                    ₹{Number(item.settlementAmount || 0).toFixed(2)}
                  </h3>
                </div>

              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">

                <button
                  onClick={() =>
                    navigate(
                      `/kocartpaymentsettlement?kocartPayment=${item._id}`
                    )
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold"
                >
                  💰 KOCART
                </button>

                <button
                  onClick={() =>
                    navigate(
                      `/deliverypaymentsettlement?deliveryPayment=${item._id}`
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                >
                  💵 Earnings
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default DeliveryList;