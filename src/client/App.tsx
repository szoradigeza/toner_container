import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/zh-cn';
import RenderRouter from './routes';

import './App.less';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <RenderRouter />
        </BrowserRouter>
    );
};

export default App;
