import { API } from '../config'


export const getBookingTimesDefault = () => {
    return fetch(`${API}/bookings/getbookingtimes`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}

export const setBookingTimesDefault = (userId, token, data) => {
    return fetch(`${API}/bookings/setcustombookingtimes/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}

export const getBookingTimesCustom = () => {
    return fetch(`${API}/bookings/getcustombookingtimes`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}

export const getBookingTimesAll = () => {
    return fetch(`${API}/bookings/all`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}
export const deleteBookingsTimes = (id) => {
    return fetch(`${API}/bookings/delete`, {
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

export const setHoliday = (data) => {
    return fetch(`${API}/month/holiday`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { });
}

export const getWorkingDays = (data) => {
    return fetch(`${API}/days/read`, {
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

export const setWorkingDay = (data) => {
    return fetch(`${API}/days/update`, {
        method: 'PUT',
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



export const setAdminInfoApi = (userId, token, data) => {
    return fetch(`${API}/about/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: data
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAdminInfo = () => {
    return fetch(`${API}/aboutapi`, {
        method: 'GET'
        ,
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}