import { API } from '../config'


export const sendSMS = (data) => {
    return fetch(`${API}/sms/send`, {
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

export const scheduleSMS = (data) => {
    return fetch(`${API}/sms/schedule`, {
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