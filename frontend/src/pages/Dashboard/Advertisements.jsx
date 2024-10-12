import React, { useEffect ,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";

import { useCryptoStore } from "../../store/cryptoStore";

const Advertisements = () => {

    const { getAdverts, adverts, isLoading, error, } = useCryptoStore();

    useEffect(() => {
        getAdverts(); // This will fetch the adverts when the component is first rendered
        console.log(adverts);
    }, []);
    

    const getTotalAdverts = (adverts) => {
        if (!adverts) return 0; 
        return adverts.length;
    };
    
    const getTotalPayout = (adverts) => {
        if (!adverts || adverts.length === 0) return 0; 
        return adverts.reduce((total, advert) => total + (advert.payout || 0) * (advert.viewers || 0), 0);
    };
    
    const getHighestPayout = (adverts) => {
        if (!adverts || adverts.length === 0) return 0;
        const highestAdvert = adverts.reduce((prev, current) => (prev.payout > current.payout ? prev : current));
        return highestAdvert.payout;
    };

    const totalAdverts = getTotalAdverts(adverts);
    const totalPayout = getTotalPayout(adverts);
    const highestPayout = getHighestPayout(adverts);

	return (
        <div className="relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex p-3 space-x-3">
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Total Adverts</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>{totalAdverts}</h1>
                </div>
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Available Payout</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>{totalPayout}</h1>
                </div>
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Highest Payout</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>{highestPayout}</h1>
                </div>
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="block lg:flex p-3 lg:space-x-3">
                {/* Adverts */}
                <div className="bg-neutral-900 w-full mt-5 lg:mt-0 lg:w-3/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    {adverts && adverts.length > 0 ? (
                        adverts.map((advert, index) => (
                            <motion.tr
                                key={index}
                                className="bg-neutral-900 hover:bg-neutral-800 border-2 border-neutral-800 p-4 flex justify-between rounded-xl mb-4"
                                initial={{ opacity: 0, y: 20 }} // Initial state for animation
                                animate={{ opacity: 1, y: 0 }} // Final state for animation
                                exit={{ opacity: 0, y: 20 }} // Exit state for animation
                                transition={{ delay: index * 0.1 }} // Stagger effect
                            >
                                <div>
                                    <h1 className='text-white font-bold text-2xl'>{advert.name}</h1>
                                    <h2 className='text-neutral-300 font-semibold text-l'>
                                        Payout: {advert.payout} Pepe, Duration: {advert.time} Seconds
                                    </h2>
                                </div>
                                <div className='relative mt-3'>
                                    <NavLink
                                        to={`/dashboard/advert/${advert._id}`} 
                                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            View Advert
                                        </motion.span>
                                    </NavLink>
                                </div>
                            </motion.tr>
                        ))
                    ) : (
                        <div className="text-center text-neutral-300 font-semibold text-xl">
                            No current adverts
                        </div>
                    )}
                </div>
            </motion.div>
         </div>
	);
};
export default Advertisements;