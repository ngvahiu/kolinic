import React, { useEffect, useMemo, useRef } from 'react'
import Heading from '../../ui/Heading/Heading'
import { Button, Input, Space, Table, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDrugAction, getDrugCategoriesAction, getDrugsAction } from '../../redux/drug.slice';
import MyButton from '../../ui/Button/Button';

const { Search } = Input;

function DrugManagement() {
  const navigate = useNavigate();
  const { drugs, drugCategories } = useSelector(state => state.drug);
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(getDrugCategoriesAction({}));
    dispatch(getDrugsAction({}));
  }, [dispatch]);

  const columns = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => +a.id - +b.id
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name, id }) => <Link className='font-semibold' to={`/admin/drugs/${id}`}>{name}</Link>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <p>{text.length > 60 ? text.slice(0, 60) + "..." : text}</p>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <p>${text}</p>,
    },
    {
      title: 'Pack size',
      dataIndex: 'packSize',
      key: 'packSize',
      render: (text) => <p className='inline'>{text}</p>,
    },
    {
      title: 'Remaining',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (text) => <p className='inline'>{text}</p>,
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (_, { img }) => <div className='w-full flex justify-center'>
        <img className='w-[80px] h-[80px]' src={img} alt='img' />
      </div>,
      width: '10%'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_, { category }) => <Tag color='lime-inverse'>{category.title}</Tag>,
      filters: drugCategories.map(category => ({
        text: category.title,
        value: category.id,
      })),
      onFilter: (value, record) => record.category.id === value,
      filterSearch: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { id }) => (
        <Space size="small">
          <Button size='small' type='primary' onClick={() => navigate(`/admin/drugs/${id}`)}>EDIT</Button>
          <Button size='small' danger onClick={() => dispatch(deleteDrugAction(id))}>Delete</Button>
        </Space>
      ),
    },
  ], [drugCategories]);

  const timerRef = useRef();
  const handleSearch = (event) => {
    clearTimeout(timerRef);

    timerRef.current = setTimeout(() => {
      dispatch(getDrugsAction({ search: event.target.value }));
    }, 1000);
  }

  return (
    <div className='text-right'>
      <Heading title="DRUG MANAGEMENT" textAlign='left' size='middle' />
      <Search
        className='w-[250px] text-[1rem]'
        placeholder="Search by name"
        onChange={handleSearch}
        onPressEnter={(event) => dispatch(getDrugsAction({ search: event.target.value }))}
        allowClear
        enterButton
      />
      <br />
      <MyButton classNames="my-[1rem]" size='small' text="Create drug" onClick={() => navigate('/admin/drugs/create-drug')} />
      <Table className='border-2' columns={columns} dataSource={drugs} pagination={{
        pageSize: 10,
        pageNo: 0,
      }} showSorterTooltip />
    </div>
  )
}

export default DrugManagement