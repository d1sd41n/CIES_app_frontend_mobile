import axios from 'axios';


export default axios.create({
    baseURL: 'https://cies.tech/core/login_token/'
});