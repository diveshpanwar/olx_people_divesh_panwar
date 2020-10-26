import axios from 'axios';

const apiUrl = 'https://countries.trevorblades.com/';

export function getContinents() {
    return axios.get(`${apiUrl}`, {
        params: {
            query: `{continents{name, code}}`
        }

    });
}