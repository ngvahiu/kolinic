import { authAxios, publicAxios } from "./axios";

export const getBlogs = async ({ pageSize, pageNo }) => {
    let endpoint = null;
    if (!pageSize && !pageNo) {
        endpoint = "/blogs";
    } else {
        endpoint = `/blogs?pageSize=${pageSize}&pageNo=${pageNo}`;
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

export const getBlogTypes = async () => {
    const data = await publicAxios
        .get('/blogs/types')
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const getBlog = async (id) => {
    const data = await publicAxios
        .get(`/blogs/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const commentOnBlog = async (body) => {
    const data = await authAxios
        .post('/blogs/comment', body)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const deleteComment = async (id) => {
    const data = await authAxios
        .delete(`/blogs/comment/${id}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const updateComment = async ({ id, body }) => {
    const data = await authAxios
        .patch(`/blogs/comment/${id}`, body)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const reactComment = async ({ id, isLike }) => {
    const data = await authAxios
        .post(`/blogs/react-comment/${id}?isLike=${isLike}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}

export const deleteReactComment = async (commentId) => {
    const data = await authAxios
        .delete(`/blogs/react-comment/${commentId}`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    return data;
}