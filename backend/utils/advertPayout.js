import { Advert } from '../models/advert.model.js';
import { User } from '../models/user.model.js'

export const checkRequirements = async (advertId, connectionTime, userId) => {
    try {
        const advert = await Advert.findById(advertId);
        if (!advert) {
            return false; 
        }

        const user = await User.findById(userId);
        if (!User) {
            return false; 
        }

        const userWaitingTime = Math.floor((Date.now() - connectionTime) / 1000); 
        const userMeetsRequirements = userWaitingTime < advert.time;
        console.log(`User has been waiting for ${userWaitingTime} seconds. ${userId}`);

        if (userMeetsRequirements){
            return false; // Not enough time has passed
        }
        
        
        // Payout the user 
        user.credit = user.credit + advert.payout;
        const transactionId = user.transactions.length + 1; 
        const transaction = {
            id: transactionId,
            type: 'Incoming',
            amount: advert.payout,
            note: `Payout for advert`,
            date: new Date()
        };
        
        user.transactions.push(transaction);
        await user.save(); 


        // Update advert
        advert.currentPayout += 1; 
        if (advert.currentPayout >= advert.viewers) {
            // Delete advert
            await advert.delete(); 
            return true; 
        }

        await advert.save(); 



        return true;
    } catch (error) {
        console.error('Error checking requirements:', error);
        return false; 
    }
};

export const sendBackToDashboard = (ws) => {
    ws.send(JSON.stringify({ action: 'redirect', target: '/dashboard' }));
};

export const handleUserConnection = (ws, advertId,userId, connectionTime, connectedUsers) => {
    console.log(`Received data from client: ${advertId}`);
    connectedUsers.set(advertId, { ws, connectionTime,userId });
};

export const checkUsers = async (connectedUsers) => {
    for (const [advertId, { ws, connectionTime,userId }] of connectedUsers) {
        if (ws.readyState === ws.OPEN) {
            const meetsRequirements = await checkRequirements(advertId, connectionTime,userId);
            if (meetsRequirements) {
                console.log(`User for advert ${advertId} meets requirements, disconnecting.`);
                sendBackToDashboard(ws);
                ws.close(); 
                connectedUsers.delete(advertId);
            }
        } else {
            connectedUsers.delete(advertId);
        }
    }
};
