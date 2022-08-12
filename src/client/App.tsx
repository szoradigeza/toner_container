import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/zh-cn';
import RenderRouter from './routes';

import './App.less';

import { useGetCurrentUser } from './api';
import { createBrowserHistory } from 'history';
import { useRecoilState } from 'recoil';
import { userState } from './stores/user';

const history = createBrowserHistory();

const App: React.FC = () => {
    const [user, setUser] = useRecoilState(userState);
    console.log('asd');
    console.log('test merge');
    return (
        <BrowserRouter>
            <RenderRouter />
        </BrowserRouter>
    );
};

export default App;
