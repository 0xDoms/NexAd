import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";

const Logoutp = () => {
    const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
        <div>
            <motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Logout
				</motion.button>
        </div>
	);
};
export default Logoutp;