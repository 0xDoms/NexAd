import React, { useState } from 'react';
import { motion } from "framer-motion";

import { DashInput } from "../../components/Input";
import { LetterText,Text,Link,HandCoins,Eye,Clock } from 'lucide-react';

import { useCryptoStore } from "../../store/cryptoStore";
import { useAuthStore } from "../../store/authStore";


const Advertise = () => {
    const [advert_name, setAdName] = useState("");
    const [advert_description, setAdDescription] = useState("");
    const [advert_url, setAdUrl] = useState("");
    const [advert_payout, setAdPayout] = useState("");
    const [advert_viewers, setAdViewers] = useState("");
    const [advert_duration, setAdduration] = useState("");

    const { user } = useAuthStore();

    const handleAdvert = async (e) => {
		e.preventDefault();
        try {
            console.log("")
		} catch (error) {
			console.log(error);
		}
	}


	return (
        <div className="relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex p-3 space-x-3">
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Total Pepe</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>{user.credit}</h1>
                </div>
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Personal Adverts</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>500</h1>
                </div>
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Total Adverts</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'></h1>
                </div>
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="block lg:flex p-3 lg:space-x-3">
                {/* Create advert */}
                <div className="bg-neutral-900 w-full lg:w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Create an advert</h2>
                    <form>
                    <DashInput
                        icon={LetterText}
                        type='text'
                        placeholder='Title'
                        value={advert_name}
                        onChange={(e) => setAdName(e.target.value)}
                    />
                    <DashInput
                        icon={Text}
                        type='text'
                        placeholder='Description'
                        value={advert_description}
                        onChange={(e) => setAdDescription(e.target.value)}
                    />
                    <DashInput
                        icon={Link}
                        type='text'
                        placeholder='URL'
                        value={advert_url}
                        onChange={(e) => setAdUrl(e.target.value)}
                    />
                    <DashInput
                        icon={HandCoins}
                        type='text'
                        placeholder='Amount per viewer'
                        value={advert_payout}
                        onChange={(e) => setAdPayout(e.target.value)}
                    />
                    <DashInput
                        icon={Eye}
                        type='text'
                        placeholder='Number of viewers'
                        value={advert_viewers}
                        onChange={(e) => setAdViewers(e.target.value)}
                    />
                    <DashInput
                        icon={Clock}
                        type='text'
                        placeholder='Duration'
                        value={advert_duration}
                        onChange={(e) => setAdduration(e.target.value)}
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                    >
                    Create Advert
                    </motion.button>
                    </form>
                </div>
                {/* Transactions */}
                <div className="bg-neutral-900 w-full mt-5 lg:mt-0 lg:w-2/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                </div>
            </motion.div>
         </div>
	);
};
export default Advertise;