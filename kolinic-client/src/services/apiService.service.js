import { authAxios, publicAxios } from "./axios";

export const getServices = async ({ pageSize, pageNo, search = "" }) => {
    let endpoint = null;
    if (!pageSize && !pageNo) {
        endpoint = `/services?search=${search}`;
    } else {
        endpoint = `/services?pageSize=${pageSize}&pageNo=${pageNo}&search=${search}`;
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

export const getService = async (id) => {
    const data = await publicAxios
        .get(`/services/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const deleteService = async (id) => {
    const data = await authAxios
        .delete(`/services/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const createService = async ({ body, logo, img }) => {
    const formData = new FormData();
    if (body) {
        const json = JSON.stringify(body);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("body", blob);
    }
    if (logo) {
        formData.append("logo", logo);
    }
    if (img) {
        formData.append("img", img);
    }

    const data = await authAxios
        .post('/services', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}

export const updateService = async ({ id, body, logo, img }) => {
    const formData = new FormData();
    if (body) {
        const json = JSON.stringify(body);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("body", blob);
    }
    if (logo) {
        formData.append("logo", logo);
    }
    if (img) {
        formData.append("img", img);
    }

    const data = await authAxios
        .patch(`/services/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}