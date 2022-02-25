export const addToCart = (id) => {
    return {
        type : "ADD_TO_CART",
        payload : id,
    }
}

export const removeToCart = (id) => {
    return {
        type : "REMOVE_TO_CART",
        payload : id
    }
}

export const callApi = () => {
    return async (dispatch) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        dispatch({type:"FETCH_API_DATA", payload : data});
    }
 
}

