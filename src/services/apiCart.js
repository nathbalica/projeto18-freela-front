import axios from "axios";

function addProductIntoCart(userId, item) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/cart`, {userId, item});
    return promise;
}

function getCart(userId) {
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/cart/${userId}`);
    return promise;
}

function removeAll(userId) {
    const promise = axios.put(`${import.meta.env.VITE_API_URL}/cart/${userId}`);
    return promise;
}

function removeOne(userId, itemId) {
    console.log(userId, itemId);
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/cart/${userId}`, {itemId});
    return promise;
}



const apiCart = { addProductIntoCart, getCart, removeAll, removeOne };
export default apiCart;