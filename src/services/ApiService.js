import axios from 'axios';

const baseURL = "https://api-prod.kokorokids.app"

export default axios.create({
    baseURL,
})