import axios from 'axios';

// Configuration - replace these with your actual values
const rpcUser = "root";
const rpcPassword = "root";
const nodeIp = "127.0.0.1";  // IP address of your Pepecoin node
const rpcPort = 8332;  // Default Pepecoin RPC port

// URL for the JSON-RPC interface
const rpcUrl = `http://${rpcUser}:${rpcPassword}@${nodeIp}:${rpcPort}/`;

// Function to send Pepecoins
export const sendPepe = async (address, amount) => {
    const payload = {
        jsonrpc: "1.0",
        id: "send_coins",
        method: "sendtoaddress",
        params: [address, amount]
    };


    try {
        const response = await axios.post(rpcUrl, payload, {
            headers: { "Content-Type": "application/json" }
        });

        const result = response.data;

        if (result.error) {
            throw new Error(`Error sending coins: ${result.error.message}`);
        }

        return { success: true, txId: result.result };
    } catch (error) {
        console.error("Error communicating with Pepecoin node:", error);
        return { success: false, message: "An error occurred while sending Pepecoins" };
    }
};