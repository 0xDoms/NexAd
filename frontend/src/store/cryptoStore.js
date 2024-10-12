import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/crypto";

axios.defaults.withCredentials = true;

export const useCryptoStore = create((set) => ({
	error: null,
	isLoading: false,
	message: null,
	adverts: null,
	advert: null,

	facuet: async (wallet, token) => {
		set({ isLoading: true, error: null });
        const response = {};
		try {
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
			response = await axios.post(`${API_URL}/facuet-dashboard`, { wallet, token });
			set({ isLoading: false, message: response.data.message });
		} catch (error) {
            console.log(response);
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
    },

	createAdvert: async (name,description,url,payout,viewers,duration) => {
		set({ isLoading: true, error: null });
        const response = {};
		try {
			response = await axios.post(`${API_URL}/create-advert`, { name,description,url,payout,viewers,duration });
			set({ isLoading: false, message: response.data.message });
		} catch (error) {
            console.log(response);
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
    },

	getAdverts: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/adverts`); 
			set({ isLoading: false, message: response.data.message, adverts: response.data.adverts });
		} catch (error) {
			set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

	getAdvert: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/advert/${id}`); 
			set({ isLoading: false, message: response.data.message, advert: response.data.advert });
		} catch (error) {
			set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
			throw error;
		}
	}
}));

