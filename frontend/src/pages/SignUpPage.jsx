import { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import Input from "../components/Input";

import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();

    const handleSignUp = async (e) => {
		e.preventDefault();
        try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	}

	return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-3/4 flex justify-center">
            <div className="absolute top-0 right-0 rounded-full w-[700px] h-[700px] bg-green-500 opacity-20 blur-3xl -translate-x-3/4 -translate-y-1/3 z-0"></div>
            <div className="w-full sm:w-3/4 lg:w-1/3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-8 z-10">
                <form onSubmit={handleSignUp}>
                <Input
                    icon={User}
                    type='text'
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    icon={Mail}
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    icon={Lock}
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                <PasswordStrengthMeter password={password} />
                <motion.button
                    className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                    font-bold rounded-lg shadow-lg hover:from-green-600
                    hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                </motion.button>
                </form>
                <div className='px-8 py-1  flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Already have an account?{" "}
                        <Link to={"/login"} className='text-green-400 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
	);
};
export default SignUpPage;