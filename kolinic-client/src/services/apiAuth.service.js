import { authAxios, publicAxios } from "./axios";


export const register = async (body) => {
    const data = await publicAxios
        .post('/auth/register', body)
        .then((response) => {
            localStorage.setItem('token', JSON.stringify(response.data.data.accessToken));
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const login = async (body) => {
    const data = await publicAxios
        .post('/auth/authenticate', body)
        .then((response) => {
            localStorage.setItem('token', JSON.stringify(response.data.data.accessToken));
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const updatePassword = async (body) => {
    const data = await authAxios
        .patch('/auth/update-password', body)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const addPassword = async (body) => {
    const data = await authAxios
        .patch('/auth/add-password', body)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const forgotPassword = async (email) => {
    const data = await authAxios
        .post(`/auth/forgot-password?email=${email}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const resetPassword = async ({ token, body }) => {
    const data = await authAxios
        .patch(`/auth/reset-password/${token}`, body)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const loginBySocial = async (body) => {
    const data = await publicAxios
        .post('/auth/social/authenticate', body)
        .then((response) => {
            localStorage.setItem('token', JSON.stringify(response.data.data.accessToken));
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const logout = async () => {
    const data = await authAxios
        .post('/auth/logout')
        .then((response) => {
            localStorage.removeItem("token");
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}