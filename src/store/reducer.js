const initialState = {
    price: 0,
    treatment: '',
    duration: 1,
    refNumber: 0,
    customerName: '',
    bookingTime: '',
    bookingDate: ''
}

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_BOOKTIME'){
        return {
            ...state,
            bookingTime: action.value
        }
    }
    if (action.type === 'SET_BOOKDATE'){
        return {
            ...state,
            bookingDate: action.value
        }
    }
    if (action.type === 'SET_REFNR'){
        return {
            ...state,
            refNumber: action.value
        }
    }
    if (action.type === 'SET_PRICE'){
        return {
            ...state,
            price: action.value
        }
    }
    if (action.type === 'SET_TREATMENT'){
        return {
            ...state,
            treatment: action.value
        }
    }
    if (action.type === 'SET_DURATION'){
        return {
            ...state,
            duration: action.value
        }
    }
    if (action.type === 'SET_CUSTOMER'){
        return {
            ...state,
            customerName: action.value
        }
    }
    return state
}

export default reducer