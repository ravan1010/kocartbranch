import { useState } from 'react';
import { useEffect } from 'react'
import api from '../api';


const Posts = () => {

    const [post, setpost] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [newMerchantId, setnewMerchantId] = useState(null);
    const [loading, setloading] = useState(true)

    const [selectedVariant, setSelectedVariant] = useState("all");


    useEffect(() => {

        const fetchImages = async () => {

            setloading(false)

            const res = await api.get("/api/owner/posts", {
                withCredentials: true,
            });

            setpost(res.data.post);
            setFilteredPosts(res.data.post); // ✅ Initialize filtered list
            setloading(true)
        };
        fetchImages()
    }, [])


    const copyProduct = async (productId) => {
        try {
            if (!productId || !newMerchantId) {
                return alert('enter id')
            }

            const res = await api.post(
                "/api/owner/post/copy", // Change to your API URL
                {
                    productId,
                    newMerchantId
                }
            );

            if (res.data.success) {
                alert("Product copied successfully");
                console.log(res.data.product);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to copy product");
        }
    };

    // Filter Posts
    const handleFilter = (variant) => {
        setSelectedVariant(variant);

        if (variant === "all") {
            setFilteredPosts(post);
            return;
        }

        setFilteredPosts(
            post.filter((item) => item.variantname === variant)
        );
    };

    const uniqueEvents = [
        "all",
        ...new Set(
            post.map((post) => post.variantname) || []
        ),
    ];

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Loader */}
                <div className="z-10 flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white mt-3">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8">


                    {/* Filter Buttons */}
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1 mb-8">
                        {uniqueEvents.map((event, index) => (
                            <button
                                key={index}
                                onClick={() => handleFilter(event)}
                                className={`
                                whitespace-nowrap
                                px-5 py-2
                                rounded-full
                                border
                                font-medium
                                transition-all
                                duration-300
                                shadow-sm
                                hover:scale-105
                                ${selectedVariant === event
                                        ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white border-transparent shadow-lg"
                                        : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                                    }
              `}
                            >
                                {event}
                            </button>
                        ))}
                    </div>


                    {/*event posts*/}
                    <div className="w-full mt-10 p-5 hidden md:flex flex-col">
                        {Array.isArray(filteredPosts) &&
                            filteredPosts.map((item) => (
                                <div
                                    key={item._id}
                                    className="border p-3 m-2 flex w-full rounded-lg items-center"
                                >
                                    {/* Image */}
                                    <div className="h-16 w-16 mr-4">
                                        <img
                                            src={item.image?.[0]}
                                            alt={item.name}
                                            className="h-full w-full object-cover rounded"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-lg">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.variantname}</p>
                                        </div>

                                        <div>
                                            {item.variants.map((v) => (
                                                <p key={v._id} className="text-sm">
                                                    {v.name} — ₹{v.price}
                                                </p>
                                            ))}
                                        </div>

                                        <p className="font-bold">{item.Eventcategory}</p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-6">
                                        <input
                                            type="text"
                                            placeholder="Enter Merchant ID"
                                            value={newMerchantId}
                                            onChange={(e) => setnewMerchantId(e.target.value)}
                                            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />

                                        <button
                                            onClick={() => copyProduct(item._id)}
                                            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
                                        >
                                            Copy Product
                                        </button>
                                    </div>
                                </div>

                            ))}
                    </div>


                    <div className="w-full mt-2 flex flex-col p-4 lg:hidden md:hidden ">
                        {Array.isArray(filteredPosts) &&
                            filteredPosts.map((item) => (
                                <div
                                    key={item._id}
                                    className="w-full border rounded-xl p-3 mb-3 shadow-sm bg-white"
                                >
                                    {/* Top Section */}
                                    <div className="flex gap-3">
                                        {/* Image */}
                                        <div className="w-[30%]">
                                            <img
                                                src={item.image?.[0]}
                                                alt={item.name}
                                                className="w-full h-20 object-cover rounded-lg"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="w-[70%]">
                                            <p className="font-semibold text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.variantname}</p>

                                            <ul className="mt-1 space-y-1">
                                                {item.variants.map((variant) => (
                                                    <li
                                                        key={variant._id}
                                                        className="flex justify-between text-xs"
                                                    >
                                                        <span>{variant.name}</span>
                                                        <span className="font-medium">₹{variant.price}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Posts  