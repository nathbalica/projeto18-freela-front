import axios from "axios";

function getProduct(id) {
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
    return promise;
}

const apiProduct = { getProduct };
export default apiProduct;