import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const DeliveryList = () => {
    const [Delivery, setdelivery] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        getMerchants();
    }, []);

    const getMerchants = async () => {
        try {
            const res = await api.get("/api/owner/getdeliveryData");

            if (res.data.success) {
                setdelivery(res.data.deliveryboys);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // const copyMerchantId = (id) => {
    //     navigator.clipboard.writeText(id);
    //     alert("Merchant ID copied!");
    // };

    if (loading) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nearby Merchants
            </h2>

            {Delivery.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    No merchants found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Delivery.map((deliveryBoy) => (
                        <div
                            key={deliveryBoy._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border"
                        >
                            {/* Merchant ID */}
                            <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-1">Merchant ID</p>

                                <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                                    <span className="text-sm font-mono text-gray-700 truncate">
                                        {deliveryBoy._id}
                                    </span>

                                    {/* <button
                                        onClick={() => copyMerchantId(merchant._id)}
                                        className="ml-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md hover:bg-gray-900"
                                    >
                                        Copy ID
                                    </button> */}
                                </div>
                            </div>

                            {/* Basic Details */}
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>
                                    <span className="font-semibold">📧 Email:</span>{" "}
                                    {deliveryBoy.email || "-"}
                                </p>

                                <p>
                                    <span className="font-semibold">📞 Phone:</span>{" "}
                                    {deliveryBoy.Number || "-"}
                                </p>
                                 <p>
                                    <span className="font-semibold">isOnline :</span>{" "}
                                    {deliveryBoy.isOnline || "-"}
                                </p>
                                <p>
                                    <span className="font-semibold">isAvailable :</span>{" "}
                                    {deliveryBoy.isAvailable || "-"}
                                </p>

                            </div>

                            {/* Current Stats */}
                            <div className="mt-5">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                    Current Balance
                                </h4>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>kocart Amount</span>
                                        <span className="font-semibold">
                                            ₹{Number(deliveryBoy.kocartAmount || 0).toFixed(2)}        
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>deliveryBoyAmount Amount</span>
                                        <span className="font-semibold text-green-600">
                                            ₹{Number(deliveryBoy.deliveryBoyAmount || 0).toFixed(2)}        
                                        </span>
                                    </div>


                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-semibold">Settlement</span>
                                        <span className="font-bold text-blue-700">
                                            ₹{Number(deliveryBoy.settlementAmount || 0).toFixed(2)}        
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                onClick={() => navigate(`/kocartpaymentsettlement?kocartPayment=${deliveryBoy._id}`)}
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                            >
                              kocart Payment
                            </button>
                            <button
                                onClick={() => navigate(`/deliverypaymentsettlement?deliveryPayment=${deliveryBoy._id}`)}
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                            >
                              delivery boy Payment
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryList;