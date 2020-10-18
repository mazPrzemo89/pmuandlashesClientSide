import { API } from '../config'


export const getPromotions = () => {
    return fetch(`${API}/promotionsjson`, {
        method: 'GET'
        ,
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}


export const setPromotion = (userId, token, promotion) => {


    return fetch(`${API}/promotion/create/${userId}`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(promotion)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const deletePromotion = (userId, token, id) => {

    return fetch(`${API}/promotion/remove/${userId}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}