import { API } from '../config'


export const getBookingTimes = (data) => {
    return fetch(`${API}/bookings/read`, {
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

export const bookAppointment = (data) => {
    return fetch(`${API}/bookings/book`, {
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

export const getBookings = () => {
    return fetch(`${API}/bookings/getbookings`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}

export const setBookingTimesAll = () => {
    return fetch(`${API}/bookings/setbookingtimes`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}

export const deleteDay = (data) => {
    return fetch(`${API}/bookings/deleteday`, {
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