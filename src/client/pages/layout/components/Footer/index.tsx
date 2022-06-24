import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
    <DefaultFooter
        copyright="2021 Produced by You Chengyun"
        links={[
            {
                key: 'You Chengyun',
                title: 'You Chengyun',
                blankTarget: true,
                href: ''
            },
            {
                key: 'github',
                title: <GithubOutlined />,
                href: 'https://github.com/ychengcloud/react-antd-vite-admin',
                blankTarget: true
            },
            {
                key: 'Youcheng cloud management platform',
                title: 'Youcheng cloud management platform',
                blankTarget: true,
                href: ''
            }
        ]}
    />
);
