import { authAxios, publicAxios } from "./axios";

export const getDrugs = async ({ pageSize, pageNo, direc, sortBy, search = "" }) => {
    let endpoint = null;
    if (pageSize && pageNo) {
        endpoint = `/drugs?pageSize=${pageSize}&pageNo=${pageNo}&search=${search}`;
    } else if (direc && sortBy) {
        endpoint = `/drugs?direc=${direc}&sortBy=${sortBy}&search=${search}`;
    } else {
        endpoint = `/drugs?search=${search}`;
    }

    const data = await publicAxios
        .get(endpoint)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getDrugsByCategory = async (categoryId, { pageSize, pageNo, direc, sortBy }) => {
    let endpoint = null;
    if (pageSize && pageNo) {
        endpoint = `/drugs/by-category/${categoryId}?pageSize=${pageSize}&pageNo=${pageNo}`;
    } else if (direc && sortBy) {
        endpoint = `/drugs/by-category/${categoryId}?direc=${direc}&sortBy=${sortBy}`;
    } else {
        endpoint = `/drugs/by-category/${categoryId}`;
    }

    const data = await publicAxios
        .get(endpoint)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getDrugCategories = async ({ pageSize, pageNo }) => {
    let endpoint = null;
    if (!pageSize && !pageNo) {
        endpoint = "/drug-categories";
    } else {
        endpoint = `/drug-categories?pageSize=${pageSize}&pageNo=${pageNo}`;
    }

    const data = await publicAxios
        .get(endpoint)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getDrugCategory = async (id) => {
    const data = await publicAxios
        .get(`/drug-categories/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const createDrugCategory = async ({ body, img }) => {
    const formData = new FormData();
    if (body) {
        const json = JSON.stringify(body);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("body", blob);
    }
    if (img) {
        formData.append("img", img);
    }

    const data = await authAxios
        .post('/drug-categories', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}

export const updateDrugCategory = async ({ id, body, img }) => {
    const formData = new FormData();
    if (body) {
        const json = JSON.stringify(body);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("body", blob);
    }
    if (img) {
        formData.append("img", img);
    }

    const data = await authAxios
        .patch(`/drug-categories/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}

export const deleteDrugCategory = async (id) => {
    const data = await authAxios
        .delete(`/drug-categories/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getDrug = async (id) => {
    const data = await publicAxios
        .get(`/drugs/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const deleteDrug = async (id) => {
    const data = await authAxios
        .delete(`/drugs/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const createDrug = async ({ body, img }) => {
    const formData = new FormData();
    if (body) {
        const json = JSON.stringify(body);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("body", blob);
    }
    if (img) {
        formData.append("img", img);
    }

    const data = await authAxios
        .post('/drugs', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}

export const updateDrug = async ({ id, body, img }) => {
    const formData = new FormData();
    if (body) {
        const json = JSON.stringify(body);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("body", blob);
    }
    if (img) {
        formData.append("img", img);
    }

    const data = await authAxios
        .patch(`/drugs/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getDrugOrders = async () => {
    const data = await authAxios
        .get('/drugs/order')
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const createDrugOrder = async (body) => {
    const data = await authAxios
        .post('drugs/order', body)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const cancelDrugOrder = async (id) => {
    const data = await authAxios
        .delete(`drugs/order/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const updateOrderStatus = async ({ id, status }) => {
    const data = await authAxios
        .patch(`drugs/order/${id}?status=${status}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getDrugOrdersForAdmin = async () => {
    const data = await authAxios
        .get("/drugs/order/admin")
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}