import React, { FC, useEffect, Suspense, useCallback, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { MenuList, MenuChild } from '@/models/menu.interface';
import { useGuide } from '../guide/useGuide';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useGetCurrentMenus } from '@/api';
import { userState } from '@/stores/user';
import { useRecoilState } from 'recoil';

import type { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined, FrownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RightContent from './components/RightContent';
import { ReactComponent as LogoSvg } from '@/assets/logo/react.svg';
import styles from './index.module.less';
import SuspendFallbackLoading from './suspendFallbackLoading';
import Footer from './components/Footer';

const history = createBrowserHistory();

const IconMap: { [key: string]: React.ReactNode } = {
    smile: <SmileOutlined />,
    heart: <HeartOutlined />,
    frown: <FrownOutlined />
};

const LayoutPage: FC = ({ children }) => {
    const { data: menuList } = {
        data: [
            {
                path: '/dashboard',
                name: 'Panel',
                locale: 'menu.dashboard',
                icon: 'heart'
            },
            {
                path: '/project',
                name: 'Project',
                icon: 'smile',
                locale: 'menu.project',
                children: [
                    {
                        path: '/project/list',
                        name: 'Project List',
                        locale: 'menu.project.list',
                        icon: 'smile'
                    }
                ]
            },
            {
                path: '/permission',
                name: 'permission',
                locale: 'menu.permission',
                icon: 'smile',
                children: [
                    {
                        path: '/permission/list',
                        name: 'permission list',
                        locale: 'menu.permission.list',
                        icon: 'smile'
                    }
                ]
            },
            {
                path: '/404',
                name: '404',
                locale: 'menu.notfound',
                icon: 'frown'
            }
        ]
    };

    const [user, setUser] = useRecoilState(userState);
    const [pathname, setPathname] = useState('/welcome');
    const { device, collapsed, newUser, settings } = user;
    const isMobile = device === 'MOBILE';
    // const { driverStart } = useGuide();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/dashboard');
        }
    }, [navigate, location]);

    const toggle = () => {
        setUser({ ...user, collapsed: !collapsed });
    };

    const initMenuListAll = (menu: MenuList) => {
        const MenuListAll: MenuChild[] = [];
        menu.forEach((m) => {
            if (!m?.children?.length) {
                MenuListAll.push(m);
            } else {
                m?.children.forEach((mu) => {
                    MenuListAll.push(mu);
                });
            }
        });
        return MenuListAll;
    };

    useEffect(() => {
        // newUser && driverStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newUser]);

    const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
        if (!menus) return [];

        const m = menus.map(({ icon, children, ...item }) => ({
            ...item,
            icon: icon && IconMap[icon as string],
            children: children && loopMenuItem(children)
        }));

        return m;
    };

    return (
        <ProLayout
            fixSiderbar
            collapsed={collapsed}
            location={{
                pathname: location.pathname
            }}
            {...settings}
            onCollapse={toggle}
            onMenuHeaderClick={() => history.push('https://reactjs.org/')}
            headerTitleRender={(logo, title, props) => (
                <a className={styles.layoutPageHeader}>
                    <LogoSvg />
                    {title}
                </a>
            )}
            menuHeaderRender={undefined}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (menuItemProps.isUrl || !menuItemProps.path || location.pathname === menuItemProps.path) {
                    return defaultDom;
                }

                return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            breadcrumbRender={(routers = []) => [
                {
                    path: '/',
                    breadcrumbName: 'menu.home'
                },
                ...routers
            ]}
            itemRender={(route, params, routes, paths) => {
                const first = routes.indexOf(route) === 0;
                return first ? (
                    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                ) : (
                    <span>{route.breadcrumbName}</span>
                );
            }}
            menuDataRender={() => loopMenuItem(menuList)}
            // menuDataRender={() => m}
            rightContentRender={() => <RightContent />}
            collapsedButtonRender={() => {
                return (
                    <div
                        onClick={() => toggle}
                        style={{
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}>
                        <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
                    </div>
                );
            }}>
            <Suspense fallback={<SuspendFallbackLoading />}>
                <Outlet />
            </Suspense>
        </ProLayout>
    );
};

export default LayoutPage;
