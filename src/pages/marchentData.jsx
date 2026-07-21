import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const MerchantList = () => {
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        getMerchants();
    }, []);

    const getMerchants = async () => {
        try {
            const res = await api.get("/api/owner/getmarchemtData");

            if (res.data.success) {
                setMerchants(res.data.merchants);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const copyMerchantId = (id) => {
        navigator.clipboard.writeText(id);
        alert("Merchant ID copied!");
    };

    if (loading) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nearby Merchants
            </h2>

            {merchants.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    No merchants found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {merchants.map((merchant) => (
                        <div
                            key={merchant._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border"
                        >
                            {/* Merchant ID */}
                            <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-1">Merchant ID</p>

                                <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                                    <span className="text-sm font-mono text-gray-700 truncate">
                                        {merchant._id}
                                    </span>

                                    <button
                                        onClick={() => copyMerchantId(merchant._id)}
                                        className="ml-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md hover:bg-gray-900"
                                    >
                                        Copy ID
                                    </button>
                                </div>
                            </div>
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {merchant.companyName || "KOCART"}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {merchant.category || "Category"}
                                    </p>
                                </div>

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                    Active
                                </span>
                            </div>

                            {/* Basic Details */}
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>
                                    <span className="font-semibold">📧 Email:</span>{" "}
                                    {merchant.email || "-"}
                                </p>

                                <p>
                                    <span className="font-semibold">📞 Phone:</span>{" "}
                                    {merchant.number || "-"}
                                </p>

                                <p>
                                    <span className="font-semibold">🏙 City:</span>{" "}
                                    {merchant.city || "-"}
                                </p>
                            </div>

                            {/* Lifetime Stats */}
                            <div className="mt-5">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                    Lifetime Statistics
                                </h4>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                                        <p className="text-xs text-gray-500">Sales</p>
                                        <p className="font-bold text-blue-700">
                                            ₹{merchant.lifetimesales ?? 0}
                                        </p>
                                    </div>

                                    <div className="bg-green-50 rounded-lg p-3 text-center">
                                        <p className="text-xs text-gray-500">Merchant</p>
                                        <p className="font-bold text-green-700">
                                            ₹{merchant.lifetimeMarchentAmount ?? 0}
                                        </p>
                                    </div>

                                    <div className="bg-red-50 rounded-lg p-3 text-center">
                                        <p className="text-xs text-gray-500">Commission</p>
                                        <p className="font-bold text-red-700">
                                            ₹{merchant.lifetimecommission ?? 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Current Stats */}
                            <div className="mt-5">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                    Current Balance
                                </h4>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Current Amount</span>
                                        <span className="font-semibold">
                                            ₹{merchant.amount ?? 0}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Merchant Amount</span>
                                        <span className="font-semibold text-green-600">
                                            ₹{merchant.marchentAmount ?? 0}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Platform Commission</span>
                                        <span className="font-semibold text-red-600">
                                            ₹{merchant.platformcommision ?? 0}
                                        </span>
                                    </div>

                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-semibold">Settlement</span>
                                        <span className="font-bold text-blue-700">
                                            ₹{merchant.settlementAmount ?? 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                onClick={() => navigate(`/paymentsettlement?merchantId=${merchant._id}`)}
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                            >
                                Payment
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MerchantList;