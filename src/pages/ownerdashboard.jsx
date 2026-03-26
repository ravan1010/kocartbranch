import { useEffect, useState } from 'react'
import Navbar from '../componetstoowner/navbertoowner'
import api from '../api';
import { DoorClosedLocked, DoorOpen } from 'lucide-react';

const Ownerdashboard = () => {


  const [otp, setotp] = useState()
  const [open, setopen] = useState()
  const [parcelsfrom, setParcelsfrom] = useState([]);
  const [parcelsto, setParcelsto] = useState([]);
  const [step, setStep] = useState(1);



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




  const getParcelsfrom = async () => {
    try {

      const res = await api.get("/api/parcelfromData");

      setParcelsfrom(res.data);
      console.log(`sua`, res.data)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParcelsfrom();
  }, []);

  const getParcelsto = async () => {
    try {

      const res = await api.get("/api/parceltoData");

      setParcelsto(res.data);
      console.log(`sua`, res.data)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParcelsto();
  }, []);

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
          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Parcel Orders
            </h2>

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${step === 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                From Orders
              </button>

              <button
                onClick={() => setStep(2)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${step === 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                To Orders
              </button>
            </div>

            {/* FROM CITY */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  From City Orders
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {parcelsfrom.map((parcel) => (
                    <div
                      key={parcel._id}
                      className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition"
                    >
                      <p className="text-lg font-semibold text-center text-gray-800 mb-3">
                        {parcel.fromCity} → {parcel.toCity}
                      </p>

                      <div className="space-y-3 text-sm text-gray-600">

                        <div>
                          <p className="font-semibold text-gray-700">
                            Pickup
                          </p>
                          <p>{parcel.pickupName}</p>
                          <p>{parcel.pickupPhone}</p>
                          <p>{parcel.pickupAddress}</p>

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${parcel.pickupLat},${parcel.pickupLng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📍 Pickup Map
                          </a>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-700">
                            {parcel.fromCity} Bus Stand
                          </p>

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${parcel.fromlat},${parcel.fromlon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📍 View
                          </a>
                        </div>
<div>
                          <p className="font-semibold text-gray-700">
                            {parcel.toCity} Bus Stand
                          </p>

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${parcel.tolat},${parcel.tolon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📍 View
                          </a>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">
                            Receiver
                          </p>
                          <p>{parcel.receiverName}</p>
                          <p>{parcel.receiverPhone}</p>

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${parcel.receiverLat},${parcel.receiverLng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📍 Receiver Map
                          </a>
                        </div>

                        

                      </div>

                      {/* Price + Status */}
                      <div className="flex justify-between items-center mt-4">

                        <p className="text-lg font-bold text-green-600">
                          ₹{parcel.price}
                        </p>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${parcel.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : parcel.status === "pickedup"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                        >
                          {parcel.status}
                        </span>

                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TO CITY */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  To City Orders
                </h3>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {parcelsto.map((parcel) => (
                    <div
                      key={parcel._id}
                      className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition"
                    >
                      <p className="text-lg font-semibold text-center text-gray-800 mb-3">
                        {parcel.fromCity} → {parcel.toCity}
                      </p>

                      <div className="space-y-3 text-sm text-gray-600">

                        <div>
                          <p className="font-semibold text-gray-700">
                            Pickup
                          </p>
                          <p>{parcel.pickupName}</p>
                          <p>{parcel.pickupPhone}</p>
                          <p>{parcel.pickupAddress}</p>

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${parcel.pickupLat},${parcel.pickupLng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📍 Pickup Map
                          </a>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-700">
                            {parcel.fromCity} Bus Stand
                          </p>

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${parcel.fromlat},${parcel.fromlon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📍 View
                          </a>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-700">
                            {parcel.toCity} Bus Stand
                          </p>

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${parcel.tolat},${parcel.tolon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📍 View
                          </a>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-700">
                            Receiver
                          </p>
                          <p>{parcel.receiverName}</p>
                          <p>{parcel.receiverPhone}</p>

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${parcel.receiverLat},${parcel.receiverLng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📍 Receiver Map
                          </a>
                        </div>

                      </div>

                      {/* Price + Status */}
                      <div className="flex justify-between items-center mt-4">

                        <p className="text-lg font-bold text-green-600">
                          ₹{parcel.price}
                        </p>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${parcel.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : parcel.status === "pickedup"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                        >
                          {parcel.status}
                        </span>

                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </>

    </div>
  )
}

export default Ownerdashboard
