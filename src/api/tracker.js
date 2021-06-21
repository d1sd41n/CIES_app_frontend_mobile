import axios from 'axios';


export default axios.create({
    baseURL: 'http://YOUR_DOMAIN_BACKEND/core/login_token/'
});