import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ChevronUp,ChevronDown,Wallet,Bitcoin,StickyNote,ArrowDownRight,ArrowUpRight } from 'lucide-react';


import { useCryptoStore } from "../../store/cryptoStore";
import { useAuthStore } from "../../store/authStore";
import HCaptcha from "@hcaptcha/react-hcaptcha"


import { DashInput } from "../../components/Input";

const Faucet = () => {
    const [wallet_address, setWallet] = useState("");
    const [token, setToken] = useState("");
    const [note, setNote] = useState("");
    const [countdown, setCountdown] = useState(0)

    const { user } = useAuthStore();
    const { dashboardfacuet, isLoading, error, } = useCryptoStore();

    const handleFaucet = async (e) => {
		e.preventDefault();
        try {
            console.log(token)
            await dashboardfacuet(wallet_address,token);
		} catch (error) {
			console.log(error);
		}
	}


    const calculateRemainingTime = () => {
        if (!user.lastFaucetClaim) return 0; // If no last claim, return 0
        const lastClaimTime = new Date(user.lastFaucetClaim).getTime(); // Convert to milliseconds
        const currentTime = Date.now();
        const oneHourInMillis = 60 * 60 * 1000; // 1 hour in milliseconds
        const remainingTime = oneHourInMillis - (currentTime - lastClaimTime);
        return Math.max(0, remainingTime); // Ensure it doesn't go negative
    };

    useEffect(() => {
        setCountdown(calculateRemainingTime()); // Set initial countdown

        const interval = setInterval(() => {
            setCountdown((prevCountdown) => Math.max(0, prevCountdown - 1000)); // Decrease countdown every second
        }, 1000);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [user.lastFaucetClaim]);


    const formatTime = (timeInMillis) => {
        const seconds = Math.floor((timeInMillis / 1000) % 60);
        const minutes = Math.floor((timeInMillis / (1000 * 60)) % 60);
        const hours = Math.floor((timeInMillis / (1000 * 60 * 60)) % 24);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


	return (
        <div className="relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex p-3 space-x-3">
                {/* Total Pepe */}
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Next Claim</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>
                        {countdown > 0 ? formatTime(countdown) : "Faucet Available"} 
                    </h1>
                </div>
                {/* Total Claims */}
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Claim Up To</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>120</h1>
                </div>
                {/* Total Withdrawls */}
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Total Claims</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>{user.claims}</h1>
                </div>
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="block lg:flex p-3 lg:space-x-3">
                {/* Withdraw */}
                <div className="bg-neutral-900 w-full lg:w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Facuet Pepe</h2>
                    <form onSubmit={handleFaucet}>
                    <DashInput
                        icon={Wallet}
                        type='text'
                        placeholder='Weallet Address'
                        value={wallet_address}
                        onChange={(e) => setWallet(e.target.value)}
                    />
                    <DashInput
                        icon={StickyNote}
                        type='text'
                        placeholder='Self Note'
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    {wallet_address && <HCaptcha sitekey="960e4e3c-8e76-4bda-b0fc-d7c01fa043d4" onVerify={token => setToken(token)} onExpire={e => setToken("")}/>}
                    {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                    >
                    Withdraw
                    </motion.button>
                    </form>
                </div>
                {/* Empty */}
                <div className="w-full mt-5 lg:mt-0 lg:w-2/3 p-3">
                </div>
            </motion.div>
        </div>
	);
};
export default Faucet;