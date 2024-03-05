import React, { useCallback } from 'react'
import styles from './BlogsArea.module.scss'
import Button from '../../ui/Button/Button'
import { Link } from 'react-router-dom';

function BlogCard({ blog: { id, title, content, thumbnail, postedAt, type }, size = "small" }) {
    const postedDate = new Date(postedAt);

    const renderShortDescription = useCallback(function renderShortDescription() {
        const firstString = "<p className='text-[--color-grey-500]'>";
        const secondString = "</p>";
        const firstIndex = content?.indexOf(firstString) + firstString.length;
        const secondIndex = content?.indexOf(secondString) - 1;
        const subDescription = content?.substring(firstIndex, secondIndex);

        return subDescription.length > 60 ? subDescription.slice(0, 60) + "..." : subDescription
    }, [content])

    return (
        <div className={styles['single-blog']}>
            <Link
                className={`${styles['blog-image']} ${size === "small" ? 'h-[270px]' : 'h-[420px]'}`}
                to={`/blogs/${id}`}
            >
                <img src={thumbnail} alt='blog-thumb' />
            </Link>
            <span className={styles['blog-dates']}>
                {`${postedDate.getDate()} - ${postedDate.getMonth() + 1} - ${postedDate.getFullYear()}`}
            </span>
            <div className={styles['blog-contents']}>
                <ul className={styles['blog-tags']}>
                    <li className='border-r-2 text-[--main-color] pr-[10px] text-[1.2rem] md:text-[1.8rem]'>By Admin</li>
                    <li className='ml-2 text-[--main-color] pr-[10px] text-[1.2rem] md:text-[1.8rem]'>{type.name}</li>
                </ul>
                <h4 className={styles['blog-title']}>
                    <Link className='text-[1.3rem] md:text-[1.8rem]' to={`/blogs/${id}`}>{title}</Link>
                    <p className="text-[14px] md:text-[18px] leading-[30px] text-[--text-note-color] h-[100px]">
                        {renderShortDescription()}
                    </p>
                </h4>
                <Link className='w-full text-left' to={`/blogs/${id}`}>
                    <Button text='Read More' size='large' type='outline' />
                </Link>
            </div>
        </div>
    )
}

export default BlogCard