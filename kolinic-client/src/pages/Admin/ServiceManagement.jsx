import React, { useEffect, useMemo, useRef } from 'react'
import Heading from '../../ui/Heading/Heading';
import { Button, Input, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServiceAction, getServicesAction } from '../../redux/service.slice';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '../../ui/Button/Button';
const { Search } = Input;

function ServiceManagement() {
  const { services } = useSelector(state => state.service);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(function () {
    dispatch(getServicesAction({}));
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
      render: (_, { name, id }) => <Link className='font-semibold' to={`/admin/services/${id}`}>{name}</Link>,
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (_, { img }) => <div className='w-full flex justify-center'>
        <img className='w-[80px] h-[80px]' src={img} alt='img' />
      </div>,
      width: '15%'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <p>{text.length > 60 ? text.slice(0, 60) + "..." : text}</p>,
    },
    {
      title: 'Functions',
      dataIndex: 'functions',
      key: 'functions',
      render: (_, { functions }) => functions.split('/').map(func => <Tag color='geekblue' key={func}>{func}</Tag>),
    },
    {
      title: 'Benefits',
      dataIndex: 'benefits',
      key: 'benefits',
      render: (text) => <p>{text.length > 60 ? text.slice(0, 60) + "..." : text}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { id }) => (
        <Space size="small">
          <Button size='small' type='primary' onClick={() => navigate(`/admin/services/${id}`)}>EDIT</Button>
          <Button size='small' danger onClick={() => dispatch(deleteServiceAction(id))}>Delete</Button>
        </Space>
      ),
    },
  ], [dispatch, navigate]);

  const timerRef = useRef();
  const handleSearch = (event) => {
    clearTimeout(timerRef);

    timerRef.current = setTimeout(() => {
      dispatch(getServicesAction({ search: event.target.value }));
    }, 1000);
  }

  return (
    <div className='text-right'>
      <Heading title="SERVICE MANAGEMENT" textAlign='left' size='middle' />
      <Search
        className='w-[250px] text-[1rem]'
        placeholder="Search by name"
        onChange={handleSearch}
        onPressEnter={(event) => dispatch(getServicesAction({ search: event.target.value }))}
        allowClear
        enterButton
      />
      <br />
      <MyButton classNames="my-[1rem]" size='small' text="Create service" onClick={() => navigate('/admin/services/create-service')} />
      <Table className='border-2' columns={columns} dataSource={services} pagination={{
        pageSize: 10,
        pageNo: 0,
      }} showSorterTooltip />
    </div>
  )
}

export default ServiceManagement