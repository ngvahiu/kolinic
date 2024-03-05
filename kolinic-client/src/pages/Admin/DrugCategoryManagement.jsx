import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDrugCategoryAction, getDrugCategoriesAction } from '../../redux/drug.slice';
import Heading from '../../ui/Heading/Heading';
import MyButton from '../../ui/Button/Button';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

function DrugCategoryManagement() {
    const navigate = useNavigate();
    const { drugCategories } = useSelector(state => state.drug);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDrugCategoriesAction({}));
    }, [dispatch]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Link className='font-semibold' to={`/admin/drug-categories/${1}`}>
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                </Link>
            ) : (
                <Link className='font-semibold' to={`/admin/drug-categories/${1}`}>{text}</Link>
            ),
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => +a.id - +b.id
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title')
        },
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'img',
            render: (_, { img }) => <div className='w-full flex justify-center'>
                <img className='w-[100px] h-[100px]' src={img} alt='img' />
            </div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { id }) => (
                <Space size="small">
                    <Button size='small' type='primary' onClick={() => navigate(`/admin/drug-categories/${id}`)}>EDIT</Button>
                    <Button size='small' danger onClick={() => dispatch(deleteDrugCategoryAction(id))}>Delete</Button>
                </Space>
            ),
        },
    ]

    return (
        <div className='text-right'>
            <Heading title="DRUG CATEGORY MANAGEMENT" textAlign='left' size='middle' />
            <MyButton classNames="my-[1rem]" size='small' text="Create category" onClick={() => navigate('/admin/drug-categories/create-category')} />
            <Table className='border-2' columns={columns} dataSource={drugCategories} pagination={{
                pageSize: 10,
                pageNo: 0,
            }} showSorterTooltip />
        </div>
    )
}

export default DrugCategoryManagement