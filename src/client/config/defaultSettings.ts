import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
} = {
    navTheme: 'dark',
    // dawn blue
    primaryColor: '#25476A',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    title: 'Győr BC',
    pwa: false,
    iconfontUrl: ''
};

export default Settings;
