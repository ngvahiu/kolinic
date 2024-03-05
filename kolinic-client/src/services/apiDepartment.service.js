import { publicAxios } from "./axios";

export const getDepartments = async ({ pageSize, pageNo }) => {
    let endpoint = null;
    if (!pageSize && !pageNo) {
        endpoint = "/departments";
    } else {
        endpoint = `/departments?pageSize=${pageSize}&pageNo=${pageNo}`;
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