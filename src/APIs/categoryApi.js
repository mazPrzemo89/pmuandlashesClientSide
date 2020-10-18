import { API } from '../config'

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: category
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteCategory = (userId, token, id) => {
    return fetch(`${API}/category/${userId}`, {
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

export const getCategories = () => {
    return fetch(`http://localhost:8000/api/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getCategory = (id) => {
    return fetch(`${API}/category`, {
        method: 'POST',
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


export const updateCategory = (category) => {
    return fetch(`${API}/category/update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: category
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            return err.json()
        })
}