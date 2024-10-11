import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronUp,ChevronDown,Wallet,Bitcoin,StickyNote,ArrowDownRight,ArrowUpRight } from 'lucide-react';


import { useAuthStore } from "../../store/authStore";

import { DashInput } from "../../components/Input";
import SalesOverviewChart from "../../components/Chart";

const Dashboard = () => {
    const [wallet, setWallet] = useState("");

    const { user } = useAuthStore();
    console.log("USER: ", user)

    const transactions_template = [
        { id: 1, type: 'Incoming', amount: '10,000', note: 'Salary Payment', date: '2024-10-01' },
        { id: 2, type: 'Outgoing', amount: '5,000', note: 'Bill Payment', date: '2024-10-02' },
        { id: 3, type: 'Incoming', amount: '20,000', note: 'Bonus', date: '2024-10-03' },
        { id: 4, type: 'Outgoing', amount: '15,000', note: 'Rent', date: '2024-10-04' },
        { id: 5, type: 'Outgoing', amount: '15,000', note: 'Rent', date: '2024-10-04' },
        // Add more transactions to test scrolling
        { id: 6, type: 'Incoming', amount: '7,000', note: 'Project Payment', date: '2024-10-05' },
        { id: 7, type: 'Outgoing', amount: '3,000', note: 'Groceries', date: '2024-10-06' },
        { id: 8, type: 'Incoming', amount: '8,000', note: 'Investment Return', date: '2024-10-07' },
        { id: 9, type: 'Outgoing', amount: '4,000', note: 'Utilities', date: '2024-10-08' },
        { id: 10, type: 'Incoming', amount: '6,000', note: 'Freelance Work', date: '2024-10-09' },
    ];

    const transactions = user.transactions;


	return (
        <div className="relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex p-3 space-x-3">
                {/* Total Pepe */}
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Total Pepe</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>{user.credit}</h1>
                    <h3 className='flex items-center text-red-500 font-semibold'><ChevronDown></ChevronDown>1.42%</h3>
                </div>
                {/* Total Claims */}
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Total Claims</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>{user.claims}</h1>
                    <h3 className='flex items-center text-green-500 font-semibold'><ChevronUp></ChevronUp>27.26</h3>
                </div>
                {/* Total Withdrawls */}
                <div className="bg-neutral-900 w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Total withdrawals</h2>
                    <h1 className='flex items-center text-white font-bold text-4xl mt-2'>{user.withdrawals}</h1>
                    <h3 className='flex items-center text-green-500 font-semibold'><ChevronUp></ChevronUp>0.5%</h3>
                </div>
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="block lg:flex p-3 lg:space-x-3">
                {/* Withdraw */}
                <div className="bg-neutral-900 w-full lg:w-1/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Withdraw Pepe</h2>
                    <form>
                    <DashInput
                        icon={Wallet}
                        type='text'
                        placeholder='Weallet Address'
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                    />
                    <DashInput
                        icon={Bitcoin}
                        type='text'
                        placeholder='Amount, Minimum 5000'
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                    />
                    <DashInput
                        icon={StickyNote}
                        type='text'
                        placeholder='Self Note'
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                    />
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
                {/* Transactions */}
                <div className="bg-neutral-900 w-full mt-5 lg:mt-0 lg:w-2/3 p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Recent Transcations</h2>
                    {/* Transcations Table */}
                    <div className="mt-3 max-h-[200px] overflow-y-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="text-neutral-400">
                                    <th className="border-b-2 border-neutral-600 px-4 py-2">Type</th>
                                    <th className="border-b-2 border-neutral-600 px-4 py-2">Amount</th>
                                    <th className="border-b-2 border-neutral-600 px-4 py-2">Note</th>
                                    <th className="border-b-2 border-neutral-600 px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-neutral-300">
                            {transactions.map((transaction, index) => (
                                    <motion.tr
                                        key={transaction.id}
                                        className="border-b border-neutral-600 hover:bg-neutral-800"
                                        initial={{ opacity: 0, y: 20 }} // Initial state for animation
                                        animate={{ opacity: 1, y: 0 }} // Final state for animation
                                        exit={{ opacity: 0, y: 20 }} // Exit state for animation
                                        transition={{ delay: index * 0.1 }} // Stagger effect
                                    >
                                        <td className="py-2 text-center flex items-center justify-center">
                                            {transaction.type === 'Incoming' ? (
                                                <>
                                                    <ArrowDownRight className="text-green-500 mr-2" />
                                                    <span className="text-green-500">{transaction.type}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ArrowUpRight className="text-orange-500 mr-2" />
                                                    <span className="text-orange-500">{transaction.type}</span>
                                                </>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-center">{transaction.amount}</td>
                                        <td className="px-4 py-2 text-center">{transaction.note}</td>
                                        <td className="px-4 py-2 text-center">{transaction.date}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex p-3 space-x-3">
                <div className="bg-neutral-900 w-full p-3 border-2 border-neutral-800 rounded-lg shadow-xl">
                    <h2 className='flex items-center text-neutral-600 font-semibold text-lg'>Coin Price</h2>
                    <SalesOverviewChart />
                </div>
            </motion.div>
        </div>
	);
};
export default Dashboard;