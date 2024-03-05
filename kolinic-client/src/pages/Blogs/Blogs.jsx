import React, { useEffect, useState } from 'react'
import BlogCard from '../../components/BlogsArea/BlogCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import SupportTable from '../../components/SupportTable/SupportTable';
import { Pagination } from 'antd';
import { getBlogTypes, getBlogs } from '../../services/apiBlog.service';
import { Link, useSearchParams } from 'react-router-dom';

function Blogs() {
    let [searchParams, setSearchParams] = useSearchParams();

    const [value, setValue] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [blogTypes, setBlogTypes] = useState([]);
    const [shownBlogs, setShownBlogs] = useState([]);
    const [pagination, setPagination] = useState({
        pageNo: 0,
        pageSize: 3
    });

    useEffect(function () {
        async function fetchBlogs() {
            const resBlogTypes = await getBlogTypes();
            setBlogTypes(resBlogTypes);
            const resBlogs = await getBlogs({});
            setBlogs(resBlogs);
        }
        fetchBlogs();
    }, [])

    useEffect(function () {
        const { pageNo, pageSize } = pagination;
        if (searchParams.get("type")) {
            setShownBlogs(blogs.filter(blog => blog.type.name === searchParams.get("type")).slice(pageNo * pageSize, pageNo * pageSize + pageSize))
        } else {
            setShownBlogs(blogs.slice(pageNo * pageSize, pageNo * pageSize + pageSize));
        }
    }, [pagination, blogs, searchParams])

    async function searchPost(keyword) {
        return blogs?.filter(blog => blog.title.toLowerCase().includes(keyword.toLowerCase())).map((blog) => ({
            label: <Link className='hover:text-[--main-color]' to={`/blogs/${blog.id}`}>{`${blog.title} - ${blog.type.name}`}</Link>,
            value: blog.id,
        }));
    }
    
    return (
        <div className='grid grid-cols-12 gap-[3rem]'>
            <div className='col-span-12 xl:col-span-7 flex flex-col items-center'>
                <div className='w-5/6 space-y-[5rem] max-h-[700px] overflow-y-scroll no-scrollbar'>
                    {
                        shownBlogs?.map(blog => <BlogCard
                            blog={blog}
                            key={blog.id}
                        />)
                    }
                </div>
                <Pagination
                    className='mt-[4rem] text-[2rem]'
                    responsive={true}
                    total={searchParams.get("type") ? blogs.filter(blog => blog.type.name === searchParams.get("type")).length : blogs?.length}
                    pageSize={pagination.pageSize}
                    current={pagination.pageNo + 1}
                    onChange={(current, pageSize) => {
                        setPagination({ pageNo: current - 1, pageSize: pageSize });
                    }}
                />
            </div>
            <div className='col-span-12 xl:col-span-5'>
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
                            <Link className='text-[1.5rem] text-[--color-grey-500] font-semibold hover:text-[--main-color]' to={`/blogs?type=${blogType.name}`} onClick={() => setSearchParams({
                                type: blogType.name
                            })}>
                                {blogType.name} ({blogType.blogs.length})
                            </Link>
                        </div>)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Blogs