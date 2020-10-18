import { API } from '../config'


export const getClientSecret = (data) => {
    return fetch(`${API}/stripe/payment`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },

        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}