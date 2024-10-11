import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/crypto";

axios.defaults.withCredentials = true;

export const useCryptoStore = create((set) => ({
	error: null,
	isLoading: false,
	message: null,

	facuet: async (wallet, token) => {
		set({ isLoading: true, error: null });
        const response = {};
		try {
            console.log(token);
			response = await axios.post(`${API_URL}/facuet`, { wallet, token });
			set({ isLoading: false, message: response.data.message });
		} catch (error) {
            console.log(response);
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
    },

	dashboardfacuet: async (wallet, token) => {
		set({ isLoading: true, error: null });
        const response = {};
		try {
            console.log(token);
			response = await axios.post(`${API_URL}/facuet-dashboard`, { wallet, token });
			set({ isLoading: false, message: response.data.message });
		} catch (error) {
            console.log(response);
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
    }
}));

