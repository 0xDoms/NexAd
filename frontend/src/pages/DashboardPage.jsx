import { Navigate, Route, Routes, NavLink,Link } from "react-router-dom"; 
import { motion } from "framer-motion";
import NavButton from '../components/NavButton';
import { House,LogOut,Megaphone,Droplets,BookCheck,RefreshCcwDot,DiamondPlus,UserRound } from 'lucide-react';

import Dashboard from "./Dashboard/Dashboard";
import Faucet from "./Dashboard/Faucet";
import Logoutp from "./Dashboard/Logoutp";
import Advertise from "./Dashboard/Advertise";
import Advertisements from "./Dashboard/Advertisements";
import Advert from "./Dashboard/Advert";

const DashboardPage = () => {

	
	return (
		<motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
		className="bg-neutral-900 w-full h-screen min-h-screen z-10 flex">
			<div className="w-2/12 min-w-28 lg:min-w-60 flex flex-col p-4 space-y-3 border-r-2 border-neutral-800">
				<NavButton to="/dashboard" icon={House} label="Dashboard" />

				<h1 className="text-lg font-semibold mb-2 text-white my-10">Earn</h1>
				<NavButton to="/dashboard/advertisements" icon={Megaphone} label="Advertisements" />
				<NavButton to="/dashboard/faucet" icon={Droplets} label="Faucet" />

				<h1 className="text-lg font-semibold mb-2 text-white my-10">Advertise</h1>
				<NavButton to="/dashboard/advertise" icon={DiamondPlus} label="Advertise" />

				<h1 className="text-lg font-semibold mb-2 text-white my-10">Account</h1>
				<NavButton to="/dashboard/logout" icon={LogOut} label="Logout" />
			</div>
			<div className=" w-10/12 p-10 overflow-y-scroll">
				<div className="absolute top-0 right-0 rounded-full w-[700px] h-[700px] bg-green-500 opacity-20 blur-3xl translate-x-1/3 -translate-y-1/3 z-0"></div>
				<div className="absolute top-1/5 right-2/4 rounded-full w-[300px] h-[300px] bg-green-500 opacity-10 blur-3xl translate-x-1/2 translate-y-1/2 z-0"></div>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="faucet" element={<Faucet />} />
					<Route path="logout" element={<Logoutp />} />
					<Route path="advertise" element={<Advertise />} />
					<Route path="advertisements" element={<Advertisements />} />
					<Route path="advert/:advertid" element={<Advert />} />
				</Routes>
			</div>
		</motion.div>
	);
};
export default DashboardPage;