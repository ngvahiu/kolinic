import React, { useEffect } from 'react'
import Heading from '../../ui/Heading/Heading'
import BlogCard from './BlogCard'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsAction } from '../../redux/blog.slice';
import Loading from '../Loading/Loading';

function BlogsArea() {
    const { blogs, isLoading } = useSelector(state => state.blog);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getBlogsAction({ pageNo: 0, pageSize: 3 }));
    }, [dispatch]);

    if (isLoading) return <Loading />;

    return (
        <div className='px-20 mt-[6rem] mb-[10rem]'>
            <Heading
                title='Latest News & Tips'
                description='Condimentum rutrum placerat egestas condimentum mi eros. Eleifend cras quirntum Feugiat elit placerat. Diam tempor malesuada.'
            />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    blogs?.map(blog => <BlogCard
                        blog={blog}
                        key={blog.id}
                    />)
                }
            </div>
        </div>
    )
}

export default BlogsArea