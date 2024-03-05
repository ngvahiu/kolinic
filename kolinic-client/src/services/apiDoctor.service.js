import { authAxios, publicAxios } from "./axios";

export const getDoctors = async ({ pageSize, pageNo, search = "" }) => {
    let endpoint = null;
    if (!pageSize && !pageNo) {
        endpoint = `/doctors?search=${search}`;
    } else {
        endpoint = `/doctors?pageSize=${pageSize}&pageNo=${pageNo}&search=${search}`;
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

export const getDoctor = async (id) => {
    const data = await publicAxios
        .get(`/doctors/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const deleteDoctor = async (id) => {
    const data = await authAxios
        .delete(`/doctors/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const createDoctor = async ({ body, avatar }) => {
    const formData = new FormData();
    if (body) {
        const json = JSON.stringify(body);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("body", blob);
    }
    if (avatar) {
        formData.append("avatar", avatar);
    }

    const data = await authAxios
        .post('/doctors', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}

export const updateDoctor = async ({ id, body, avatar }) => {
    const formData = new FormData();
    if (body) {
        const json = JSON.stringify(body);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("body", blob);
    }
    if (avatar) {
        formData.append("avatar", avatar);
    }

    const data = await authAxios
        .patch(`/doctors/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}