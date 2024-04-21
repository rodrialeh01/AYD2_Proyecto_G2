import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.11:4000/'
});

// Producto:
// Listar Productos
export const getProducts = async (id) => {
    const response = await instance.get(`products/get/${id}`);
    return response.data;
}

// añadir la imagen al bucket:
export const uploadImage = async (image) => {
    console.log(image);
    const response = await instance.post('products/addImage', image, {
        headers: {
            accept: 'application/json',
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

//Eliminar Producto
export const deleteProduct = async (id) => {
    const response = await instance.delete(`products/delete/${id}`);
    return response.data;
}

//Compra:
//Crear Compra
export const createPurchase = async (purchase) => {
    const response = await instance.post('purchase/create', purchase, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

//PAGAR COMPRA
export const createPurchasesWithPay = async(data) => {
    const response = await instance.post('purchase/pay', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}

//USUARIOS:
//Crear Usuario
export const registrarUsuario = async (usuario) => {
    const response = await instance.post('auth/sign/up', usuario, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

// LOGIN
// Iniciar Sesión
export const login = async (usuario) => {
    const response = await instance.post('auth/sign/in', usuario, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // console.log(response);
    return response;
}

// Obtener Usuario
export const getUser = async (id) => {
    const response = await instance.get(`users/get/${id}`);
    return response.data;
}

// Obtener todos los usuarios
export const getAllUsers = async () => {
    const response = await instance.get('users/all');
    return response.data;
}

// Eliminar Usuario
export const deleteUser = async (id) => {
    const response = await instance.delete(`users/delete/${id}`);
    return response.data;
}

// recuperarPassword
export const recuperarPassword = async (email) => {
    const response = await instance.post(`auth/forgot/password/${email}`);
    return response;
}

// REVIEW
// Obtener Reviews
export const getReviews = async (id) => {
    const response = await instance.get(`review/get/${id}`);
    return response.data;
}

// Crear Review
export const createReview = async (review) => {
    const response = await instance.post('review/create', review, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response);
    return response.data;
}

export const getReportReview = async () => {
    const response = await instance.get('/review/report');
    return response.data;
}

// Delete Review
export const deleteReview = async (id) => {
    const response = await instance.delete(`review/delete/${id}`);
    return response.data;
}

// Actualizar Review
export const updateReview = async (id, review) => {
    const response = await instance.put(`review/update/${id}`, review, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

// Reviews
export const getAllRevies = async () => {
    const response = await instance.get('review/all');
    return response.data;
}

// vista de ventas de un vendedor
export const getVendorPurchases = async (idVendor) => {
    const response = await instance.get(`purchase/getDetailedPurchase/${idVendor}`);
    return response.data;
}

// obtener ingresos de un vendedor
export const getIngresos = async (idVendor) => {
    const response = await instance.get(`purchase/getIngresos/${idVendor}`);
    return response.data;
}

// obtener ventas por rango de fechas
export const getReport1 = async (fechaI, fechaF) => {
    const response = await instance.get(`purchase/getVentas`, {
        params: {
            fechaI,
            fechaF
        }
    });
    return response.data;
}

//OBTENER TODOS LOS PAGOS

export const getPays = async () => {
    const response = await instance.get('pays')
    return response.data;
}

//Top 10 vendedores con más ventas
export const getTop10Sellers = async () => {
    const response = await instance.get('purchase/getTop10Sellers');
    return response.data;
}

//Tipo usuarios
export const getReportUserTypes = async () => {
    const response = await instance.get('users/getReportUserTypes');
    return response.data;
  }

// Subir imagen de perfil
export const uploadProfileImage = async (image) => {
    const response = await instance.post('users/addImage', image, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}



//Editar Usuario
export const updateUser = async (id, usuario) => {
    const response = await instance.patch(`users/update/${id}`, usuario, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}


//BITACORA
//Obtener Bitácoras
export const getAuditoria = async () => {
    const response = await instance.get('bitacora');
    return response.data;
}