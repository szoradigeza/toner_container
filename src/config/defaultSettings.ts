import { Settings as LayoutSettings } from "@ant-design/pro-layout";

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: "dark",
  // 拂晓蓝
  primaryColor: "#1890ff",
  layout: "mix",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: "kicsi a pocsod szucs",
  pwa: false,
  iconfontUrl: "",
};

export default Settings;
