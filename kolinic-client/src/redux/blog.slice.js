import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { commentOnBlog, deleteComment, deleteReactComment, getBlog, getBlogTypes, getBlogs, reactComment, updateComment } from "../services/apiBlog.service";

export const getBlogsAction = createAsyncThunk(
    "blogs/getBlogs",
    async ({ pageSize, pageNo }, { rejectWithValue }) => {
        try {
            const res = await getBlogs({ pageSize, pageNo });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const getBlogTypesAction = createAsyncThunk(
    "blogs/getBlogTypes",
    async ({ rejectWithValue }) => {
        try {
            const res = await getBlogTypes();
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const getBlogAction = createAsyncThunk(
    "blogs/getBlog",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getBlog(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const commentAction = createAsyncThunk(
    "blogs/comment",
    async (body, { rejectWithValue }) => {
        try {
            const res = await commentOnBlog(body);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const deleteCommentAction = createAsyncThunk(
    "blogs/deleteComment",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteComment(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const updateCommentAction = createAsyncThunk(
    "blogs/updateComment",
    async ({ id, body }, { rejectWithValue }) => {
        try {
            const res = await updateComment({ id, body });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const reactCommentAction = createAsyncThunk(
    "blogs/reactComment",
    async ({ id, isLike }, { rejectWithValue }) => {
        try {
            const res = await reactComment({ id, isLike });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const deleteReactCommentAction = createAsyncThunk(
    "blogs/deleteReactComment",
    async (commentId, { rejectWithValue }) => {
        try {
            const res = await deleteReactComment(commentId);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);

const initialState = {
    isLoading: false,
    isUpdating: false,
    isCommenting: false,
    blogs: [],
    blogTypes: [],
    blog: null
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        removeComment: (state, action) => {
            return {
                ...state, blog: {
                    ...state.blog, comments: state.blog.comments.filter(comment => comment.id !== action.payload)
                }
            }
        },
        removeReactComment: (state, action) => {
            let newComments = structuredClone(current(state).blog.comments);
            const index = newComments.findIndex(comment => comment.id === action.payload.commentId);
            if (index !== -1) {
                newComments[index].reactComments = newComments[index].reactComments.filter(rc => rc.id.commentId !== action.payload.commentId || rc.id.userId !== action.payload.userId);
            }
            return {
                ...state, isCommenting: false, blog: {
                    ...state.blog, comments: newComments
                }
            };
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getBlogsAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getBlogsAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, blogs: action.payload };
            })
            .addCase(getBlogsAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getBlogTypesAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getBlogTypesAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, blogTypes: action.payload };
            })
            .addCase(getBlogTypesAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getBlogAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getBlogAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, blog: action.payload };
            })
            .addCase(getBlogAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(commentAction.pending, (state) => {
                return { ...state, isCommenting: true };
            })
            .addCase(commentAction.fulfilled, (state, action) => {
                toast.success("Comment on blog successfully", {
                    position: "top-right"
                });
                return { ...state, isCommenting: false, blog: { ...state.blog, comments: [...state.blog?.comments, action.payload] } };
            })
            .addCase(commentAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isCommenting: false };
            })
            .addCase(deleteCommentAction.pending, (state) => {
                return { ...state, isCommenting: true };
            })
            .addCase(deleteCommentAction.fulfilled, (state, action) => {
                toast.success("Delete comment successfully", {
                    position: "top-right"
                });
                return { ...state, isCommenting: false };
            })
            .addCase(deleteCommentAction.rejected, (state, action) => {
                toast.error(action.error, {
                    position: "top-right"
                })
                return { ...state, isCommenting: false };
            })
            .addCase(updateCommentAction.pending, (state) => {
                return { ...state, isCommenting: true };
            })
            .addCase(updateCommentAction.fulfilled, (state, action) => {
                toast.success("Edit comment successfully", {
                    position: "top-right"
                });

                const index = current(state).blog.comments.findIndex(comment => comment.id === action.payload.id);
                let newComments = [...current(state).blog.comments];
                if (index !== -1) {
                    newComments[index] = action.payload;
                }
                return {
                    ...state, isCommenting: false, blog: {
                        ...state.blog, comments: newComments
                    }
                };
            })
            .addCase(updateCommentAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isCommenting: false };
            })
            .addCase(reactCommentAction.pending, (state) => {
                return { ...state, isCommenting: true };
            })
            .addCase(reactCommentAction.fulfilled, (state, action) => {
                let newComments = structuredClone(current(state).blog.comments);
                const index = newComments.findIndex(comment => comment.id === action.payload.id.commentId);
                if (index !== -1) {
                    const indexRc = newComments[index].reactComments?.findIndex(rc => rc.id.commentId === action.payload.id.commentId && rc.id.userId === action.payload.id.userId);
                    if (indexRc !== -1) {
                        newComments[index].reactComments[indexRc] = action.payload;
                    } else {
                        newComments[index].reactComments = [...newComments[index].reactComments, action.payload];
                    }
                }
                return {
                    ...state, isCommenting: false, blog: {
                        ...state.blog, comments: newComments
                    }
                };
            })
            .addCase(reactCommentAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isCommenting: false };
            })
            .addCase(deleteReactCommentAction.pending, (state) => {
                return { ...state, isCommenting: true };
            })
            .addCase(deleteReactCommentAction.fulfilled, (state, action) => {
                return { ...state, isCommenting: false };
            })
            .addCase(deleteReactCommentAction.rejected, (state, action) => {
                toast.error(action.error, {
                    position: "top-right"
                })
                return { ...state, isCommenting: false };
            })
});

export const {
    removeComment,
    removeReactComment
} = blogSlice.actions;
export default blogSlice.reducer;