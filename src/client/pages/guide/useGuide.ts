import { useRef } from 'react';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import './index.less';
import { userState } from '@/stores/user';
import { useRecoilState } from 'recoil';

export const useGuide = () => {
    const [user, setUser] = useRecoilState(userState);

    const driver = useRef(
        new Driver({
            animate: false,
            keyboardControl: false,
            allowClose: false,
            overlayClickNext: true,
            closeBtnText: 'app.guide.driverjs.closeBtnText',
            prevBtnText: 'app.guide.driverjs.prevBtnText',
            nextBtnText: 'app.guide.driverjs.nextBtnText',
            doneBtnText: 'app.guide.driverjs.doneBtnText'
        })
    );

    const driverStart = () => {
        setTimeout(() => {
            driver.current.defineSteps([
                {
                    element: '#sidebar-trigger',
                    popover: {
                        title: 'app.guide.driverStep.sidebarTrigger.title',
                        description: 'app.guide.driverStep.sidebarTrigger.description',
                        position: 'top',
                        offset: 10,
                        isFirst: true
                    }
                },
                {
                    element: '#language-change',
                    popover: {
                        title: 'app.guide.driverStep.switchLanguages.title',

                        description: 'app.guide.driverStep.switchLanguages.description',
                        position: 'bottom',
                        offset: -200
                    }
                }
            ]);

            localStorage.setItem('newUser', 'false');
            setUser({
                ...user,
                newUser: false
            });
            driver.current.start();
            console.log('guide started');
        }, 1000);
    };

    return {
        driverStart
    };
};

export default useGuide;
