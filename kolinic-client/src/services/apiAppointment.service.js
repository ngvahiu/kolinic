import { authAxios } from "./axios";

export const getMyAppointments = async ({ pageSize, pageNo }) => {
    let endpoint = null;
    if (!pageSize && !pageNo) {
        endpoint = "/appointments";
    } else {
        endpoint = `/appointments?pageSize=${pageSize}&pageNo=${pageNo}`;
    }

    const data = await authAxios
        .get(endpoint)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const createAppointment = async (body) => {
    console.log('body', body);
    const data = await authAxios
        .post('/appointments', body)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const createFeedback = async (body) => {
    const data = await authAxios
        .post('/feedbacks', body)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const cancelAppointment = async (id) => {
    const data = await authAxios
        .delete(`/appointments/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getAppointmentsForAdmin = async () => {
    const data = await authAxios
        .get('/appointments/admin')
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const completeAppointment = async (id) => {
    const data = await authAxios
        .patch(`/appointments/admin/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}