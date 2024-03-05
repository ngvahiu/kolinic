import { authAxios } from "./axios";

export const getMe = async () => {
    const data = await authAxios
        .get('/users/me')
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const updateMe = async ({ body, avatar }) => {
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
        .patch('/users/me', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => response.data.data)
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getUsers = async (searchValue) => {
    const data = await authAxios
        .get(`/users?search=${searchValue}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const activateUser = async ({ id, value }) => {
    const data = await authAxios
        .patch(`/users/activate/${id}?value=${value}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const deleteUser = async (id) => {
    const data = await authAxios
        .delete(`/users/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}