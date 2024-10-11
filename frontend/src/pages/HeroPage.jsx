import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Bitcoin } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import { useCryptoStore } from "../store/cryptoStore";
import { useAuthStore } from "../store/authStore";
import HCaptcha from "@hcaptcha/react-hcaptcha"


const HeroPage = () => {
    const [wallet_address, setWallet] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const { facuet, isLoading, error, } = useCryptoStore();

    const { isAuthenticated, user } = useAuthStore();

    const handleFaucet = async (e) => {
		e.preventDefault();
        try {
            console.log(token)
            await facuet(wallet_address,token);
		} catch (error) {
			console.log(error);
		}
	}

    const handleClick = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/signup");
        }
    };


	return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-3/4 lg:flex">
            <div className="flex-1 flex flex-col items-center justify-center lg:items-start lg:justify-start">
                <h1 className="text-white font-bold text-6xl text-center lg:text-left">
                    Get <span className="bg-gradient-to-br from-green-600 to-green-400 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(82,229,180,1)] hover:drop-shadow-[0_0_25px_rgba(82,229,180,1)] transition-all duration-300">Crypto</span> Now,<br/>Instant Withdrawal<br/>Available
                </h1>
                <p className="text-gray-600 text-center lg:text-left">Earn free crypto, withdraw within<br/>seconds to your personal wallet.</p>
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start text-center py-6">
                    {isAuthenticated ? (
                        <motion.button
                            className="xl:w-1/2 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleClick} // Handle click for redirection
                        >
                            Go to Dashboard
                        </motion.button>
                    ) : (
                        <motion.button
                            className="xl:w-1/2 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button" // Changed to button
                            onClick={handleClick} // Handle click for potential actions
                        >
                            Get Started
                        </motion.button>
                    )}
                </div>
            </div>
            <div className=" flex-1 flex items-center justify-center">
                <div className="absolute rounded-full w-[400px] h-[400px] bg-green-500 z-0 opacity-20 blur-3xl -translate-x-40 -translate-y-20"></div>
                <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-8 z-10">
                    <h1 className="text-white font-semibold">Faucet</h1>
                    <p className="text-gray-400 font-light">Receive up to 20 free coins</p>
                    <form onSubmit={handleFaucet}>
                        <Input
                            icon={Bitcoin}
                            type='text'
                            placeholder='Wallet Address'
                            value={wallet_address}
                            onChange={(e) => setWallet(e.target.value)}
                        />
                        {wallet_address && <HCaptcha sitekey="960e4e3c-8e76-4bda-b0fc-d7c01fa043d4" onVerify={token => setToken(token)} onExpire={e => setToken("")}/>}
                        {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
                        <motion.button
                            className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                            font-bold rounded-lg shadow-lg hover:from-green-600
                            hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                            focus:ring-offset-gray-900 transition duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                        >
                            Claim
                        </motion.button>
                    </form>
                    <h1 className="text-gray-400 font-light">Claim up to 500% when registered inside the dashboard</h1>
                </div>
            </div>
        </motion.div>
	);
};
export default HeroPage;