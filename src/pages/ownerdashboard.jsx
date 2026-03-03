import { useEffect, useState } from 'react'
import Navbar from '../componetstoowner/navbertoowner'
import api from '../api';

const Ownerdashboard = () => {


    const [otp, setotp] = useState()

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



    return (
        <div> 
         <>
                <Navbar />
                <div className="h-auto w-full flex flex-col mb-5 items-center mt-10">
                    <div className="flex flex-col md:w-150 items-center w-full h-auto rounded px-5 p-4 shadow-xl/65 shadow-black inset-shadow-sm inset-shadow-indigo-500 ">
                        <h2 className="font-bold text-3xl mt-10"  >image and link for ads</h2>


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
