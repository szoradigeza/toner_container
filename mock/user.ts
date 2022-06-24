import { MockMethod } from 'vite-plugin-mock';

const mockMenuList = [
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
];

const mockNoticeList = [
    {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'You received 14 new weekly newspapers',
        datetime: '2017-08-09',
        type: 'notification'
    },
    {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: 'Your recommended Qu Nini has passed the third round of interviews',
        datetime: '2017-08-08',
        type: 'notification'
    },
    {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: 'This template can differentiate between various notification types',
        datetime: '2017-08-07',
        read: true,
        type: 'notification'
    },
    {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The icons on the left are used to distinguish different types',
        datetime: '2017-08-07',
        type: 'notification'
    },
    {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'The content should not exceed two lines of words, and it will be automatically truncated when it exceeds',
        datetime: '2017-08-07',
        type: 'notification'
    },
    {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Lili Qu commented on you',
        description: 'description information description information',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true
    },
    {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Zhu Pianyou replied to you',
        description:
            "This template is used to remind who has interacted with you, with the avatar of 'who' on the left",
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true
    },
    {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'title',
        description:
            "This template is used to remind who has interacted with you, with the avatar of 'who' on the left",
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true
    },
    {
        id: '000000009',
        title: 'mission name',
        description: 'The task needs to be started before 2017-01-12 20:00',
        extra: 'has not started',
        status: 'todo',
        type: 'event'
    },
    {
        id: '000000010',
        title: 'Third Party Emergency Code Changes',
        description:
            'Kuanlin was submitted on 2017-01-06, and the code change task needs to be completed before 2017-01-07',
        extra: 'due soon',
        status: 'urgent',
        type: 'event'
    },
    {
        id: '000000011',
        title: "itle: 'Information Security Exam'",
        description: 'Assign Zuher to complete the update and release before 2017-01-09',
        extra: '8 days passed',
        status: 'doing',
        type: 'event'
    },
    {
        id: '000000012',
        title: 'ABCD Version releae',
        description:
            'Kuanlin was submitted on 2017-01-06, and the code change task needs to be completed before 2017-01-07',
        extra: 'processing',
        status: 'processing',
        type: 'event'
    }
];

export default [
    {
        url: '/api/v1/login',
        method: 'POST',
        response: ({ body }) => {
            return {
                token: '123abcdefg',
                username: body.username,
                role: body.username
            };
        }
    },
    {
        url: '/api/v1/current/user',
        method: 'get',
        // statusCode: 401,
        response: ({ body }) => {
            return {
                username: 'decker',
                role: 'admin'
            };
        }
    },
    {
        url: '/api/v1/current/menu',
        method: 'get',
        response: ({ body }) => {
            return mockMenuList;
        }
    },
    {
        url: '/api/v1/current/notice',
        method: 'get',
        response: ({ body }) => {
            return mockNoticeList;
        }
    }
] as MockMethod[];
