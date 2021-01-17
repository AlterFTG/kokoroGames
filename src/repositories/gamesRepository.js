import apiService from '../services/ApiService';

const resource = "/games/";

export default {
    async get() {
        const response = await apiService.get(`${resource}`);
        return response.data.games;
    },

}
