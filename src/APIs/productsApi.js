import { API } from '../config'


export const createProduct = (userId, token, product) => {
    console.log(product)
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


export const deleteProduct = (userId, token, id) => {
    return fetch(`${API}/product/${userId}`, {
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

export const getProducts = () => {
    return fetch(`${API}/productss`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getProductsByCategory = (id) => {
    return fetch(`${API}/products/cat/${id}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getProductPrice = (name) => {
    return fetch(`${API}/price/product`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ name })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getProductById = (id) => {
    return fetch(`${API}/productbyid`, {
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

export const updateProduct = (product) => {
    return fetch(`${API}/product/update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}