import { verify } from 'hcaptcha';
import { User } from '../models/user.model.js'
import { Advert } from '../models/advert.model.js'
import { sendPepe } from '../modules/pepe.js';


const userClaims = [];


export const facuet = async (req, res) => {
    const { wallet, token } = req.body;
    const ipAddress = req.ip; 
    const currentTime = Date.now(); 
    try{
        
        if (!token){
            return res.status(400).json({success:false, message:"Missing captcha."});
        }

        let { success } = await verify(process.env.CAPTCHA_SECRET, token)
        if (!success){
            return res.status(400).json({success:false, message:"Invalid captcha."});
        }

        const userIndex = userClaims.findIndex(user => user.wallet === wallet && user.ip === ipAddress);

        if (userIndex !== -1) {
            // User exists, check the time since last claim
            const lastClaimTime = userClaims[userIndex].lastClaimTime;

            // If last claim was within the last hour (3600000 milliseconds)
            if (currentTime - lastClaimTime < 3600000) {
                return res.status(429).json({ success: false, message: "You can only claim once every hour." });
            }
        }

        const amount = Math.floor(Math.random() * 20);
        const result = await sendPepe(wallet, amount);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message });
        }


        // Update or add user data
        const newUserData = {
            wallet: wallet,
            ip: ipAddress,
            lastClaimTime: currentTime
        };

        if (userIndex !== -1) {
            // Update existing user's last claim time
            userClaims[userIndex].lastClaimTime = currentTime;
        } else {
            // Add new user data to the list
            userClaims.push(newUserData);
        }

        return res.status(200).json({ success: true, message: "Crypto sent to user's wallet", txId: result.txId });
        
    } catch (error){
        console.log('Error while requesting facuet, ', error);
    }
}


export const Dashboradfacuet = async (req, res) => {
    const { wallet, token,userID } = req.body;
    const ipAddress = req.ip; 
    const currentTime = Date.now(); 
    try{


        /*
        if (!token){
            return res.status(400).json({success:false, message:"Missing captcha."});
        }

        let { success } = await verify(process.env.CAPTCHA_SECRET, token)
        if (!success){
            return res.status(400).json({success:false, message:"Invalid captcha."});
        }*/

        // Check if the user has already claimed under an hour
        const user = await User.findById(req.userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }



        const lastClaim = user.lastFaucetClaim;
        const currentTime = Date.now();

        const oneHourInMillis = 60 * 60 * 1000; // 1 hour in milliseconds
        const hasClaimedRecently = (currentTime - lastClaim) < oneHourInMillis;
        console.log(hasClaimedRecently,currentTime,lastClaim)

        if (hasClaimedRecently) {
            return res.status(403).json({ success: false, message: "You have already claimed within the last hour." });
        }


        
        const amount = Math.floor(Math.random() * 120);
        const result = await sendPepe(wallet, 1);
        console.log(result)
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message });
        }

        user.lastFaucetClaim = currentTime;
        await user.save();
        return res.status(200).json({ success: true, message: "Crypto sent to user's wallet", txId: result.txId });
    } catch (error){
        console.log('Error while requesting facuet, ', error);
    }
}



export const createAdvert = async (req, res) => {
    const { name,description,url, payout, viewers, duration } = req.body;
    const ipAddress = req.ip; 
    const currentTime = Date.now(); 
    try{
        const user = await User.findById(req.userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        // Check if the user has the funds.
        if (user.credit < (payout*viewers)){
            return res.status(404).json({ success: false, message: "Insufficient funds" });
        }


        const advert = new Advert({
            name: name,
            description: description,
            url: url,
            payout: payout,
            viewers: viewers,
            currentPayout: 0,
            time: duration,
            ownerid: req.userID
        })

        await advert.save();


        user.credit = user.credit-(payout*viewers);
        await user.save();

        return res.status(200).json({ success: true, message: "Ad successfully created!" });
    } catch (error){
        console.log('Error while requesting facuet, ', error);
    }
}


export const getAdverts = async (req, res) => {
    try{
        const user = await User.findById(req.userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        const adverts = await Advert.find({});

        return res.status(200).json({
            success: true,
            message: "All adverts fetched successfully!",
            adverts: adverts
        });
    } catch (error){
        console.log('Error while requesting facuet, ', error);
    }
}


export const getAdvert = async (req, res) => {
    const { id } = req.params
    try{
        const user = await User.findById(req.userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        const advert = await Advert.findById(id);
        if (!advert){
            return res.status(404).json({ success: false, message: "Advert not found" });
        }

        return res.status(200).json({
            success: true,
            message: "All advert fetched successfully!",
            advert: advert
        });
    } catch (error){
        console.log('Error while requesting facuet, ', error);
    }
}