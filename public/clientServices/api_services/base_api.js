import axios from 'axios';
import {BASE_API_URL} from '../constants';

class ApiServices {

    getUserList() {
        return axios.get(`${BASE_API_URL}/api/get_users/`)
    }

}

export default ApiServices;
