import { AiOutlineCheck } from 'react-icons/ai'
import Heading from '../../ui/Heading/Heading'
import styles from './DepartmentsArea.module.scss'

function DepartmentItem({ department: { img, name, description, functions } }) {
    return (
        <div className={styles['department-selected']}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-[5rem] mt-10'>
                <img
                    className={styles['department-image']}
                    src={img}
                    alt='department-img'
                />
                <div className='mt-[3rem]'>
                    <Heading
                        title={name}
                        description={description}
                        textAlign="left"
                        bottomBar={false}
                    />
                    <ul className='mt-5 space-y-2 md:space-y-5'>
                        {
                            functions.split("/").map((func, index) => <li className='flex items-center gap-5' key={index}>
                                <AiOutlineCheck className='text-[--main-color]' />
                                <span className='text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] text-[--color-grey-500]'>{func}</span>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DepartmentItem