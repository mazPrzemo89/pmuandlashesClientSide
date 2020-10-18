import { API } from '../config'


export const setDbMonth = (data) => {
    return fetch(`${API}/month/read`, {
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

