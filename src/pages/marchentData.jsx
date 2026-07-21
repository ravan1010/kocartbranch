import React, { useEffect, useState } from "react";
import api from "../api";

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h2>Nearby Merchants</h2>

      {merchants.length === 0 ? (
        <p>No merchants found.</p>
      ) : (
        merchants.map((merchant) => (
          <div
            key={merchant._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{merchant.companyName || "kocart"}</h3>

            <p><strong>Email:</strong> {merchant.email || "kocart"}</p>
            <p><strong>Phone:</strong> {merchant.number || "kocart"}</p>
            <p><strong>Category:</strong> {merchant.category || "kocart"}</p>
            <p><strong>City:</strong> {merchant.city || "kocart"}</p>

            <hr />

            <p><strong>Total Sales:</strong> ₹{merchant.lifetimesales || "null"}</p>
            <p><strong>Platform Commission:</strong> ₹{merchant.lifetimecommission || "null"}</p>
            <p><strong>Merchant Earnings:</strong> ₹{merchant.lifetimeMarchentAmount || "null"}</p>

            <hr />

            <p><strong>Current Amount:</strong> ₹{merchant.amount || "null"}</p>
            <p><strong>Platform Commission:</strong> ₹{merchant.platformcommision || "null"}</p>
            <p><strong>Merchant Amount:</strong> ₹{merchant.marchentAmount || "null"}</p>
            <hr />

            <p><strong>Settlement Amount:</strong> ₹{merchant.settlementAmount || "null"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MerchantList;