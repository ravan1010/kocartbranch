import { useEffect, useState } from 'react'
import Navbar from '../componetstoowner/navbertoowner'
import api from '../api';

const Ownerdashboard = () => {


    const [otp, setotp] = useState()
    const [open, setopen] = useState()

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
    },[])

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





    return (
        <div> 
         <>
                <Navbar />
                <div className="h-auto w-full flex flex-col mb-5 items-center mt-10">
                    <div className="flex flex-col md:w-150 items-center w-full h-auto rounded px-5 p-4 shadow-xl/65 shadow-black inset-shadow-sm inset-shadow-indigo-500 ">
                        <h2 className="font-bold text-3xl mt-10"  >image and link for ads</h2>


                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-4 flex rounded-full bg-green-100 text-green-600 ">
                  {open === false ? <>
                    <DoorClosedLocked size={24} />
                    <p className='mx-2'>close</p>
                  </>
                    :
                    <>
                      <DoorOpen size={24} />
                      <p className='mx-2'>open</p>
                    </>
                  }
                </div>
                <div className="ml-8">
                  <input
                    type="checkbox"
                    checked={open}
                    onChange={handleToggle}
                    className='w-6 h-6 border'
                  />
                </div>
              </div>
            </div>

                {Array.isArray(otp) && otp.map((product) => (
                    <div key={product._id} className="border rounded-2xl shadow hover:shadow-lg transition duration-300 m-1 my-2">
                        <h1 className="text-center font-bold underline">Marchent otp </h1>
                        <p className="text-center "> mobile NO : {product.number} <br /> otp : {product.otp}</p>
                    </div>
                ))}

            </>
        
        </div>
    )
}

export default Ownerdashboard
