import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { FaSearch, FaServicestack } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { BsCapsule } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import { CiUser } from 'react-icons/ci';
import { IoExitOutline } from 'react-icons/io5';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { logout } from '../services/apiAuth.service';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/auth.slice';

const { Header, Content, Sider } = Layout;

const items = [
    {
        title: 'User management',
        key: '1',
        icon: <HiUsers />,
        to: '/admin/users'
    },
    {
        title: 'Services management',
        key: '2',
        icon: <FaServicestack />,
        to: '/admin/services'
    },
    {
        title: 'Doctors management',
        key: '3',
        icon: <FaUserDoctor />,
        to: '/admin/doctors'
    },
    {
        title: 'Drugs management',
        key: 'sub1',
        icon: <BsCapsule />,
        subItems: [
            {
                title: 'Categories',
                key: '4',
                to: '/admin/drug-categories'
            },
            {
                title: 'Drugs',
                key: '5',
                to: '/admin/drugs'
            },
            {
                title: 'Drug orders',
                key: '6',
                to: '/admin/drug-orders'
            }
        ]
    },
    {
        title: 'Appointments management',
        key: '7',
        icon: <FaSearch />,
        to: '/admin/appointments'
    },
    {
        title: 'Profile',
        key: '8',
        icon: <CiUser />,
        to: '/admin/profile'
    },
    {
        title: 'Log out',
        key: '9',
        icon: <IoExitOutline />
    }
];


function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState(['1']);
    const dispatch = useDispatch();

    useEffect(function () {
        items.forEach(item => {
            if (item.key.includes('sub')) {
                item.subItems.forEach(subItem => {
                    if (location.pathname.includes(subItem.to)) {
                        setSelectedKeys([subItem.key]);
                        return;
                    }
                })
            } else if (location.pathname.includes(item.to)) {
                setSelectedKeys([item.key]);
                return;
            }
        });
    }, [location]);

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical flex justify-center p-[20px]">
                    <img src={require('../assets/img/logo.png')} alt='logo' />
                </div>
                <Menu theme="light" selectedKeys={selectedKeys} mode="inline">
                    {
                        items.map(item => {
                            if (item.key.includes('sub')) {
                                return <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
                                    {
                                        item.subItems.map(subItem => <Menu.Item key={subItem.key}>
                                            <Link to={subItem.to}>
                                                {subItem.title}
                                            </Link>
                                        </Menu.Item>)
                                    }
                                </Menu.SubMenu>
                            } else if (item.key === '9') {
                                return <Menu.Item key={item.key} icon={item.icon} onClick={() => dispatch(logoutAction({}))}>
                                    <Link className='flex items-center gap-2'>
                                        {item.title}
                                    </Link>
                                </Menu.Item>
                            } else {
                                return <Menu.Item key={item.key} icon={item.icon}>
                                    <Link className='flex items-center gap-2' to={item.to}>
                                        {item.title}
                                    </Link>
                                </Menu.Item>
                            }
                        })
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            <ToastContainer autoClose={1000} />
        </Layout>
    )
}

export default AdminLayout