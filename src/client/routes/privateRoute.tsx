import React, { FC, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { Navigate, RouteProps, useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from '../stores/user';
import { useGetCurrentUser } from '../api';
import { createBrowserHistory } from 'history';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
    const history = createBrowserHistory();

    const [user, setUser] = useRecoilState(userState);

    const logged = user.username ? true : false;

    const { data: currentUser, error } = useGetCurrentUser();

    useEffect(() => {
        setUser({ ...user, username: currentUser?.username || '', logged: true });
    }, [currentUser]);

    if (error) {
        setUser({ ...user, logged: false });
        return <Navigate to="/login" />;
    }

    return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
