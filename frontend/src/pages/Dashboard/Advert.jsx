import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { useCryptoStore } from "../../store/cryptoStore";
import { useAuthStore } from "../../store/authStore";

const Advert = () => {
	const { advertid } = useParams();
	const { user } = useAuthStore();
    const { getAdvert, advert, isLoading, error } = useCryptoStore();
	const [ws, setWs] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const loadAdvert = async () => {
            await getAdvert(advertid);
        };

        loadAdvert();

        // Initialize WebSocket connection
        const websocket = new WebSocket('ws://localhost:5000');

        websocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        websocket.onmessage = (message) => {
            const { action, target } = JSON.parse(message.data); 
            console.log(`Received message: ${action}`);
            if (action === 'redirect') {
                navigate(target); 
            }
        };

        websocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setWs(websocket); 

        return () => {
            websocket.close(); // Clean up on unmount
        };
    }, [advertid, getAdvert]);

    useEffect(() => {
        if (ws && advert) {
            ws.send(JSON.stringify({ advertId: advertid, userId: user._id }));
        }
    }, [ws, advert, advertid]);



    return (
		<div className='w-full h-screen flex justify-center items-center'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-900 border-2 border-neutral-800 p-4 max-w-md flex flex-col items-center rounded-lg shadow-xl"
            >
				{isLoading ? ( 
                    <p className="text-white text-lg text-center">Loading advert...</p>
                ) : advert ? (
                    <>
                        <img
                            src={advert.url}
                            alt={advert.name}
                            className='h-48 w-full object-cover rounded-t-lg'
                        />
                        <h1 className="text-white text-2xl mt-4 font-bold text-center">{advert.name}</h1>
                        <p className="text-white text-lg text-center mt-2">{advert.description}</p>
                    </>
                ) : (
                    <p className="text-white text-lg text-center">Advert not found.</p>
                )}
            </motion.div>
        </div>
    );
};
export default Advert;