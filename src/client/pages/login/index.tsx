import React, { FC } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginParams } from '../../models/login';
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { Location } from 'history';
import { useLogin } from '@/api';

import styles from './index.module.less';
import { ReactComponent as LogoSvg } from '@/assets/logo/logo.svg';

const initialValues: LoginParams = {
    username: 'guest',
    password: 'guest'
    // remember: true
};

const LoginForm: FC = () => {
    const loginMutation = useLogin();
    const navigate = useNavigate();
    const location = useLocation() as Location<{ from: string }>;

    // const dispatch = useAppDispatch();

    const onFinished = async (form: LoginParams) => {
        const result = await loginMutation.mutateAsync(form);
        console.log('result: ', result);

        if (result) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('username', result.username);

            const from = location.state?.from || { pathname: '/dashboard' };
            navigate(from);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.header}>
                    <Link to="/">
                        <LogoSvg className={styles.logo} />
                        <span className={styles.title}>Győr BC</span>
                    </Link>
                </div>
                {/* <div className={styles.desc}>
                    Vadonatúj technológiai halom(React\Recoil\React Query\React Hooks\Vite)háttérmenedzsment rendszer
                </div> */}
            </div>
            <div className={styles.main}>
                <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'kérlek add meg a felhasználónevet!' }]}>
                        <Input size="large" placeholder="felhasználónév" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Kérem írja be a jelszavát!' }]}>
                        <Input type="password" size="large" placeholder="Jelszó" />
                    </Form.Item>
                    {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>记住用户</Checkbox>
                    </Form.Item> */}
                    <Form.Item>
                        <Button size="large" className={styles.mainLoginBtn} htmlType="submit" type="primary">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
