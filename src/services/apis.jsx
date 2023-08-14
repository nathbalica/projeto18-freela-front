// estava organizando as apis assim, acredito que ficam mais organizadas
// vou deixar abaixo os exemplos para usarmos

import axios from "axios"

function configToken(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

function login(body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/signin`, body);
    // const promise = axios.post(`http://localhost:5000/signin`, body);

    return promise;
}

function signUp(body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/signup`, body);
    return promise;
}

function getKittens(token) {
    const config = configToken(token);
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/kittens`, config);
    return promise;
}

function getUserKittens(token) {
    const config = configToken(token);
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/user-kittens`, config);
    return promise;
}

function createKitten(token, body) {
    const config = configToken(token);
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/kittens`, body, config);
    return promise;
}

function getKitten(token, id) {
    const config = configToken(token);
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/kittens/${id}`, config);
    return promise;
}

function updateKitten(token, id, body) {
    const config = configToken(token);
    const promise = axios.put(`${import.meta.env.VITE_API_URL}/kittens/${id}`, body, config);
    return promise;
}

function toggleKittenStatus(token, id, body) {
    const config = configToken(token);
    const promise = axios.patch(`${import.meta.env.VITE_API_URL}/kittens/${id}/toggle-status`, body, config);
    return promise;
}

function deleteKitten(token, id) {
    const config = configToken(token);
    const promise = axios.delete(`${import.meta.env.VITE_API_URL}/kittens/${id}`, config);
    return promise;
}

// function createShoppingCart(token) {
//     const config = configToken(token);
//     const promise = axios.post(`${import.meta.env.VITE_API_URL}/cart`, null, config);
//     return promise;
// }

export async function createShoppingCart(token) {
    const config = configToken(token);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, null, config);
    return response.data; // Supondo que a resposta da API contenha um campo chamado "cartId"
}

export async function createCartItem(token, body) {
    const config = configToken(token);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/addCart`, body, config);
    console.log(response)
    return response.data; // Supondo que a resposta da API contenha um campo chamado "cartId"
}

function getCartItemsByCartId(token, id) {
    const config = configToken(token);
    const response = axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`, config);
    return response;
}

function updateCartItem(token, itemId, body) {
    const config = configToken(token);
    const promise = axios.put(`${import.meta.env.VITE_API_URL}/itemCart/${itemId}`, body, config);
    return promise;
}

function deleteCartItem(token, itemId) {
    const config = configToken(token);
    const promise = axios.delete(`${import.meta.env.VITE_API_URL}/itemCart/${itemId}`, config);
    return promise;
}

export async function createOrder(token) {
    const config = configToken(token);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/order`, null, config);
    return response.data;
  }
  
  export async function getOrderById(token, orderId) {
    const config = configToken(token);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, config);
    return response.data;
  }
  
  export async function updateOrderItem(token, orderId, itemId, body) {
    const config = configToken(token);
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/orders/${orderId}/items/${itemId}`, body, config);
    return response.data;
  }

  export function deleteCartItemsByCartId(token, cartId) {
    const config = configToken(token);
    const promise = axios.delete(`${import.meta.env.VITE_API_URL}/cart/${cartId}/items`, config);
    return promise;
}



const apis = {
    login,
    signUp,
    getKittens,
    createKitten,
    getKitten,
    getUserKittens,
    updateKitten,
    toggleKittenStatus,
    deleteKitten,
    createShoppingCart,
    createCartItem,
    getCartItemsByCartId,
    updateCartItem,
    deleteCartItem,
    createOrder, // Add the new function
    getOrderById, // Add the new function
    updateOrderItem,
    deleteCartItemsByCartId
};


export default apis;


// function logout(token){
//     const config = configToken(token);
//     const promise = axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, config)
//     return promise;
// }

// function getSession(token) {
//     const promise = axios.get(`${import.meta.env.VITE_API_URL}/session/${token}`);

//     return promise;
// }


// function getKittens(token) {
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const promise = axios.get(`${import.meta.env.VITE_API_URL}/kittens`, config);
//     return promise;
// }

// function getSuggestions(token) {
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const promise = axios.get(`${import.meta.env.VITE_API_URL}/product-suggestions`, config);
//     return promise;
// }

// function searchProducts(token, searchValue) {
//     const config = {
//       headers: { Authorization: `Bearer ${token}` },
//       params: { search: searchValue },
//     };
  
//     const promise = axios.get(
//       `${import.meta.env.VITE_API_URL}/products-search`,
//       config
//     );
    
//     return promise;
//   }

// function getOrder(token) {
//     const config = configToken(token);
//     const promise = axios.get(`${import.meta.env.VITE_API_URL}/checkout`, config);

//     return promise;
// }

// function finishOrder(token) {
//     const config = configToken(token);
//     const promise = axios.delete(`${import.meta.env.VITE_API_URL}/checkout`, config);

//     return promise;
// }

// function cancelOrder(token){
//     const config = configToken(token);
//     const promise = axios.delete(`${import.meta.env.VITE_API_URL}/cancel-checkout`, config);

//     return promise;
// }


