interface MenuItem {
  /** menu item name */
  name: string;
  /** menu labels */
  label: {
    zh_CN: string;
    en_US: string;
  };
  /** Icon name
   *
   * Sub-sub-menus don't need icons
   */
  icon?: string;
  /** menu id */
  key: string;
  /** menu routing */
  path: string;
  /** Submenu */
  children?: MenuItem[];
}

export type MenuChild = Omit<MenuItem, "children">;

export type MenuList = MenuItem[];
