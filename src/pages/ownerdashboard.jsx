import { useEffect, useState } from 'react'
import Navbar from '../componetstoowner/navbertoowner'
import api from '../api';
import { DoorClosedLocked, DoorOpen } from 'lucide-react';
import { generateAndSaveFCMToken } from '../utili/token';


const Ownerdashboard = () => {


  const [delivery, setdelivery] = useState();
  const [open, setopen] = useState()
  const [marchent, setmarchent] = useState([]);
  const [loading, setLoading] = useState(true);
  
  

  // const [error, setError] = useState('');
  // const [success, setsuccess] = useState('');
const fetchmarchentanddeliveryboy = async () => {
      try {
        const res = await api.get("/api/marchent/data");
        setmarchent(res.data.admin);
        setdelivery(res.data.delivery);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
     // 🔽 Fetch inactive vendors
    

    fetchmarchentanddeliveryboy()
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
      await generateAndSaveFCMToken();
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


  // 🔽 Activate vendor
    const activateVendor = async (id) => {
      try {
        await api.post(`/api/marchent/active/${id}`);
  
        // remove activated vendor from UI
        setmarchent((prev) => prev.filter((v) => v._id !== id));
        fetchmarchentanddeliveryboy();
  
      } catch (err) {
        console.error(err);
      }
    };

    // 🔽 Activate vendor
    const activatedelivery = async (id) => {
      try {
        await api.post(`/api/delivery/active/${id}`);
  
        // remove activated vendor from UI
        setmarchent((prev) => prev.filter((v) => v._id !== id));
        fetchmarchentanddeliveryboy();
  
      } catch (err) {
        console.error(err);
      }
    };
  
    if (loading) return <p>Loading...</p>;

  return (
    <div>
      <>
        <Navbar />

        <div className="p-6 max-w-6xl mx-auto space-y-6">


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

          <h2 className="text-2xl font-bold mb-4">Pending Marchent</h2>

      {marchent.length === 0 ? (
        <p>No vendors pending</p>
      ) : (
        <div className="grid gap-4">
          {marchent.map((vendor) => (
            <div
              key={vendor._id}
              className="p-4 border rounded-xl flex justify-between items-center shadow"
            >
              <div>
                <h3 className="font-semibold">{vendor.name}</h3>
                <p className="text-sm text-gray-500">{vendor.email}</p>
              </div>

              <button
                onClick={() => activateVendor(vendor._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Activate
              </button>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Pending Delivery partner</h2>

      {marchent.length === 0 ? (
        <p>No Delivery partner pending</p>
      ) : (
        <div className="grid gap-4">
          {delivery.map((vendor) => (
            <div
              key={vendor._id}
              className="p-4 border rounded-xl flex justify-between items-center shadow"
            >
              <div>
                <h3 className="font-semibold">{vendor.name}</h3>
                <p className="text-sm text-gray-500">{vendor.email}</p>
              </div>

              <button
                onClick={() => activatedelivery(vendor._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Activate
              </button>
            </div>
          ))}
        </div>
      )}


        </div>
      </>

    </div>
  )
}

export default Ownerdashboard
