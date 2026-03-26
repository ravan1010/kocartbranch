import { useEffect, useState } from 'react'
import Navbar from '../componetstoowner/navbertoowner'
import api from '../api';
import { DoorClosedLocked, DoorOpen } from 'lucide-react';

const Ownerdashboard = () => {


  const [otp, setotp] = useState()
  const [open, setopen] = useState()
  const [parcels, setParcels] = useState([]);

  // const [error, setError] = useState('');
  // const [success, setsuccess] = useState('');

  useEffect(() => {
    const fetchOTP = async () => {
      try {
        const res = await api.get('/api/owner/otpTObranch')
        console.log(res.data)
        setotp(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOTP()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/api/owner/dashboard')
      console.log(res.data.openORclose)
      setopen(res.data.openORclose)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const loadData = async () => {
      await fetchDashboard()
    }

    loadData()
  }, [])

  const handleToggle = async () => {

    const newStatus = !open;
    setopen(newStatus);

    try {
      await api.post(
        "/api/owner/openORclose",
        { open: newStatus },
        { withCredentials: true }
      ).then((res) => {
        if (res.data.success === true) {
          fetchDashboard()
        }
      })
    } catch (err) {
      console.error(err);
    }
  };


 useEffect(() => {
    getParcels();
  }, []);

  const getParcels = async () => {
    try {

      const res = await api.get("/api/parcelData");

      setParcels(res.data);
      console.log(`sua`,res.data)

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <>
        <Navbar />

        <div className="p-6 max-w-6xl mx-auto space-y-6">

          {/* ADS SECTION */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-2xl font-bold">Ad Banner / Promotion</h2>
            <p className="text-gray-500">Image and link for ads</p>
          </div>


          {/* BRANCH STATUS */}
          <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className={`p-3 rounded-full ${open ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
              >
                {open ? <DoorOpen size={24} /> : <DoorClosedLocked size={24} />}
              </div>

              <div>
                <h3 className="font-semibold text-lg">Branch Status</h3>
                <p className="text-gray-500">
                  {open ? "Branch is Open" : "Branch is Closed"}
                </p>
              </div>

            </div>

            <input
              type="checkbox"
              checked={open}
              onChange={handleToggle}
              className="w-6 h-6 cursor-pointer"
            />

          </div>


          {/* OTP SECTION */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">Merchant OTP</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {Array.isArray(otp) &&
                otp.map((product) => (
                  <div
                    key={product._id}
                    className="border rounded-lg p-4 bg-gray-50 hover:shadow-md"
                  >
                    <p className="font-semibold">Mobile</p>
                    <p>{product.number}</p>

                    <p className="mt-2 font-semibold">OTP</p>
                    <p className="text-lg font-bold text-indigo-600">
                      {product.otp}
                    </p>
                  </div>
                ))}

            </div>

          </div>


          {/* PARCEL ORDERS */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">Parcel Orders</h2>

            <div className="space-y-4">

              {parcels.map((parcel) => (

            <div
              key={parcel._id}
              className="border rounded-lg p-4 flex justify-between items-center hover:shadow"
            >

              <div>

                <p className="font-semibold">
                  {parcel.fromCity} → {parcel.toCity}
                </p>

                <p className="text-sm text-gray-500">
                  Pickup: {parcel.pickupName}
                </p>

                <p className="text-sm text-gray-500">
                  Receiver: {parcel.receiverName}
                </p>

              </div>


              <div className="text-right">

                <p className="font-bold text-lg">
                  ₹{parcel.price}
                </p>

                <p
                  className={`text-sm font-semibold ${
                    parcel.status === "pending"
                      ? "text-yellow-600"
                      : parcel.status === "pickedup"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {parcel.status}
                </p>

              </div>

            </div>

          ))}

            </div>

          </div>

        </div>
      </>

    </div>
  )
}

export default Ownerdashboard
