import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import SupportTable from '../../components/SupportTable/SupportTable'
import { BiDislike, BiLike } from "react-icons/bi";
import Button from '../../ui/Button/Button';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../../util/helper';
import { format } from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/user.slice';
import { commentAction, deleteCommentAction, deleteReactCommentAction, getBlogAction, getBlogTypesAction, getBlogsAction, reactCommentAction, removeComment, removeReactComment, updateCommentAction } from '../../redux/blog.slice';
import Loading from '../../components/Loading/Loading';
import JsxParser from 'react-jsx-parser';

function BlogDetails() {
    const [value, setValue] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const { id } = useParams();

    const { blogs, blogTypes, blog, isLoading, isCommenting } = useSelector(state => state.blog);
    const dispatch = useDispatch();


    useEffect(function () {
        dispatch(getBlogsAction({}));
        dispatch(getBlogTypesAction({}));
        dispatch(getBlogAction(id));
    }, [id, dispatch])

    async function handleComment() {
        if (commentContent !== "") {
            dispatch(commentAction({ content: commentContent, blogId: +id }));
            setCommentContent("");
        }
    }

    const renderPostedDate = useCallback(function renderPostedDate() {
        if (blog) {
            const postedDate = new Date(blog.postedAt);
            return formatDate(postedDate);
        }
    }, [blog]);

    async function searchPost(keyword) {
        return blogs?.filter(blog => blog.title.toLowerCase().includes(keyword.toLowerCase())).map((blog) => ({
            label: <Link className='hover:text-[--main-color]' to={`/blogs/${blog.id}`}>{`${blog.title} - ${blog.type.name}`}</Link>,
            value: blog.id,
        }));
    }

    if (isLoading) return <Loading />;

    return (
        <div className='grid grid-cols-12 md:gap-[1.5rem] xl:gap-[3rem]'>
            <div className='col-span-12 md:col-span-7 flex flex-col items-center'>
                <div className='w-5/6 space-y-[5rem]'>
                    <div className='w-full h-[300px] sm:h-[320px] xl:h-[350px] rounded-t-3xl relative' style={{
                        backgroundImage: `url(${blog?.thumbnail})`,
                        backgroundSize: '100% 100%'
                    }}>
                        <div className='flex justify-center items-center bg-[--main-color] p-[1.8rem] rounded-full absolute top-full -translate-y-1/2 right-1/2 translate-x-1/2'>
                            <span className='text-[--color-grey-0] text-[1.8rem] font-bold'>
                                {renderPostedDate()}
                            </span>
                        </div>
                    </div>
                    <div className='mt-[2rem]'>
                        <h1 className='text-[--color-grey-900] text-[2.5rem] font-bold transition-all duration-300 hover:text-[--main-color]'>{blog?.title}</h1>
                        <div className='flex items-center justify-start'>
                            <span className='text-[1.6rem] text-[--main-color] border-r-2 pr-[1rem]'>By Admin</span>
                            <span className='text-[1.6rem] text-[--main-color] pl-[1rem]'>Doctor, Clinic</span>
                        </div>
                        <div className='mt-[2rem] space-y-[2rem]'>
                            <p className='text-justify'>
                                <JsxParser autoCloseVoidElements jsx={blog?.content} />
                            </p>
                        </div>
                    </div>
                    <div className='mt-[1rem] md:mt-[2rem] md:space-y-[2rem]'>
                        <h1 className='text-[--color-grey-900] text-[2rem] font-bold'>{blog?.comments?.length} Comments</h1>
                        <div className='max-h-[400px] overflow-y-scroll'>
                            {
                                blog?.comments.map(comment => <Comment comment={comment} key={comment.id} />)
                            }
                        </div>
                    </div>
                    <div className='mt-[1rem] md:mt-[2rem] space-y-[1rem] md:space-y-[2rem]'>
                        <h1 className='text-[--color-grey-900] text-[2rem] font-bold'>Leave A Comment</h1>
                        <textarea
                            className='w-full h-[100px] p-[1rem] border-2 rounded-2xl' placeholder='Write a comment'
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <Button
                            text="POST A COMMENT"
                            size="large"
                            disabled={isCommenting}
                            onClick={handleComment}
                        />
                    </div>
                </div>
            </div>
            <div className='col-span-12 md:col-span-5 mt-[3rem] md:mt-0'>
                <SearchBar
                    value={value}
                    placeholder="Find posts"
                    fetchOptions={searchPost}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    style={{
                        width: '100%',
                        height: '50px'
                    }}
                />
                <div className='mt-[3rem]'>
                    <SupportTable
                        title="Popular Post"
                        renderContent={blogs?.slice(0, 5).map(blog => <div className='p-[1.5rem] border-b-2' key={blog.id}>
                            <Link className='text-[1.5rem] text-[--color-grey-500] font-semibold hover:text-[--main-color]' to={`/blogs/${blog.id}`}>
                                {blog.title}
                            </Link>
                        </div>)}
                    />
                </div>
                <div className='mt-[3rem]'>
                    <SupportTable
                        title="Other Types"
                        renderContent={blogTypes?.map(blogType => <div className='p-[1.5rem] border-b-2' key={blogType.id}>
                            <Link className='text-[1.8rem] text-[--color-grey-500] font-semibold hover:text-[--main-color]' to={`/blogs?type=${blogType.name}`}>
                                {blogType.name} ({blogType.blogs.length})
                            </Link>
                        </div>)}
                    />
                </div>
            </div>
        </div>
    )
}

function Comment({ comment: { user, createdAt, content, reactComments, id } }) {
    const [allowEdit, setAllowEdit] = useState(false);
    const [commentContent, setCommentContent] = useState("");

    const me = useSelector(getUser);
    const { isCommenting } = useSelector(state => state.blog);
    const dispatch = useDispatch();

    function handleDeleteComment() {
        dispatch(deleteCommentAction(id));
        dispatch(removeComment(+id));
    }

    function handleUpdateComment() {
        if (commentContent !== "") {
            dispatch(updateCommentAction({ id, body: { content: commentContent } }));
            setAllowEdit(false);
            setCommentContent("");
        }
    }

    function handleLike() {
        const rc = reactComments?.find(rc => rc.id.userId === me.id) || null;
        if (!rc || !rc.like) {
            dispatch(reactCommentAction({ id, isLike: true }));
        } else {
            dispatch(deleteReactCommentAction(id));
            dispatch(removeReactComment({ commentId: +id, userId: me.id }));
        }
    }

    function handleDislike() {
        const rc = reactComments?.find(rc => rc.id.userId === me.id) || null;
        if (!rc || rc.like) {
            dispatch(reactCommentAction({ id, isLike: false }));
        } else {
            dispatch(deleteReactCommentAction(id));
            dispatch(removeReactComment({ commentId: +id, userId: me.id }));
        }
    }

    return (
        <div className='flex justify-between items-start gap-[2rem] px-[1rem] py-[1.5rem] border-b-2'>
            <img className='w-[90px] h-[90px] rounded-full' src={user.avatar || "https://invisiblechildren.com/wp-content/uploads/2012/07/facebook-profile-picture-no-pic-avatar.jpg"} alt='user-avatar' />
            <div className='flex-grow'>
                <div className='flex justify-between items-center'>
                    <div className='space-y-[0.5rem]'>
                        <p className='text-[--color-grey-900] text-[2.4rem] font-bold'>{user.fullName}</p>
                        {
                            !allowEdit && <p className='flex items-center gap-[2rem] text-[--main-color] text-[1.5rem] font-bold'>
                                <span>{format(createdAt)}</span>
                                {
                                    me.id === user.id && <p className='flex items-center gap-[0.5rem] text-[--color-grey-400]'>
                                        <button className='cursor-pointer hover:underline' onClick={() => {
                                            setAllowEdit(true);
                                            setCommentContent(content);
                                        }}>Edit</button>
                                        <span>•</span>
                                        <button className='cursor-pointer hover:underline' onClick={handleDeleteComment}>Delete</button>
                                    </p>
                                }
                            </p>
                        }
                    </div>
                    <div className='flex items-center gap-[2rem]'>
                        <div className='flex flex-col items-center'>
                            <button onClick={handleLike}>
                                <BiLike className={`text-[2.7rem] font-extrabold cursor-pointer hover:text-[--main-color] ${reactComments?.some(rc => rc.id.userId === me?.id && rc.like) ? 'text-[--main-color]' : ''}`} />
                            </button>
                            <span>{reactComments?.filter(rc => rc.like).length || 0}</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <button onClick={handleDislike}>
                                <BiDislike className={`text-[2.7rem] font-extrabold cursor-pointer hover:text-red-500 ${reactComments?.some(rc => rc.id.userId === me?.id && !rc.like) ? 'text-red-500' : ''}`} />
                            </button>
                            <span>{reactComments?.filter(rc => !rc.like).length || 0}</span>
                        </div>
                    </div>
                </div>
                {
                    allowEdit ? <div className='w-full'>
                        <textarea
                            className='w-full h-[100px] p-[1rem] border-2 rounded-2xl' placeholder='Write a comment'
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <div className='w-full flex items-center justify-end gap-[1rem]'>
                            <Button
                                text="Save"
                                size="medium"
                                disabled={isCommenting}
                                onClick={handleUpdateComment}
                            />
                            <Button
                                text="Cancel"
                                size="medium"
                                type='outline'
                                disabled={isCommenting}
                                onClick={() => {
                                    setAllowEdit(false);
                                    setCommentContent("");
                                }}
                            />
                        </div>
                    </div> : <p className='text-[1.8rem] text-[--color-grey-600] leading-[1.8rem] mt-[2rem]'>
                        {content}
                    </p>
                }
            </div>
        </div>
    )
}

export default BlogDetails