import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";

const KocartPayment = () => {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    deliveryBoyID: "",
    kocartAmount: "",
  });

  useEffect(() => {
    const deliveryBoyID = searchParams.get("kocartPayment");

    if (deliveryBoyID) {
      setForm((prev) => ({
        ...prev,
        deliveryBoyID,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(
        "/api/owner/kocartamount",
        form,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        alert(data.message);

        setForm((prev) => ({
          ...prev,
          kocartAmount: "",
        }));
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Kocart Payment Verify
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="deliveryBoyID"
          value={form.deliveryBoyID}
          readOnly
          className="w-full border rounded-lg px-4 py-2 bg-gray-100"
        />

        <input
          type="number"
          name="kocartAmount"
          placeholder="Enter Kocart Amount"
          value={form.kocartAmount}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Update Settlement
        </button>
      </form>
    </div>
  );
};

export default KocartPayment;