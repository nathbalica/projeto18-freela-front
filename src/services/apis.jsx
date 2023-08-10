// estava organizando as apis assim, acredito que ficam mais organizadas
// vou deixar abaixo os exemplos para usarmos

import axios from "axios"

function configToken(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

function login(body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/login`, body);

    return promise;
}

function signUp(body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, body);

    return promise;
}

function logout(token){
    const config = configToken(token);
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, config)
    return promise;
}

function getSession(token) {
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/session/${token}`);

    return promise;
}


function getProducts(token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/products`, config);
    return promise;
}

function getSuggestions(token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/product-suggestions`, config);
    return promise;
}

function searchProducts(token, searchValue) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: { search: searchValue },
    };
  
    const promise = axios.get(
      `${import.meta.env.VITE_API_URL}/products-search`,
      config
    );
    
    return promise;
  }

function getOrder(token) {
    const config = configToken(token);
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/checkout`, config);

    return promise;
}

function finishOrder(token) {
    const config = configToken(token);
    const promise = axios.delete(`${import.meta.env.VITE_API_URL}/checkout`, config);

    return promise;
}

function cancelOrder(token){
    const config = configToken(token);
    const promise = axios.delete(`${import.meta.env.VITE_API_URL}/cancel-checkout`, config);

    return promise;
}


const apis = {
    login,
    signUp,
    logout,
    getProducts,
    getSuggestions,
    searchProducts,
    getSession,
    getOrder,
    finishOrder,
    cancelOrder
}

export default apis;