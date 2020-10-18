import { API } from '../config'


export const uploadPhoto = (userId, token, image) => {
    return fetch(`${API}/photo/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: image
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const deletePhoto = (id) => {
    return fetch(`${API}/photo/delete`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ id })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getPhotos = () => {
    return fetch(`${API}/photos`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};