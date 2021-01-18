import apiService from '../services/ApiService';

const resource = "/games/";

export default {
    async get() {
        try {
        const response = await apiService.get(`${resource}`);
        return response.data.games;
    }catch(err){
        console.log(err);
    }
    },

}
