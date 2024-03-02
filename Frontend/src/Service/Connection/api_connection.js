import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});

// Producto:
// Listar Productos
export const getProducts = async (id) => {
    const response = await instance.get(`products/get/${id}`);
    return response.data;
}

// añadir la imagen al bucket:
export const uploadImage = async (image) => {
    //console.log([...image.entries()]);

    const response = await instance.post('products/addImage', image, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}

// Crear Producto
export const createProduct = async (product) => {
    const response = await instance.post('products/create', product, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

// Editar Producto
export const editProduct = async (id, product) => {
    const response = await instance.patch(`products/update/${id}`, product,{
        headers: {
            'Content-Type': 'application/json'
        }});
    return response.data;
}

// Obtener Todos los productos
export const getAllProducts = async () => {
    const response = await instance.get('products/all');
    return response.data;
}

//Obtener un producto
export const getProduct = async (id) => {
    const response = await instance.get(`products/see/${id}`);
    return response.data;
}