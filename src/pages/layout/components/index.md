---
title: Ant Design Pro
sidemenu: false
---

# Ant Design Pro

All the components used in Pro are listed here. These components are not suitable as component libraries, but are really needed in business. So we have prepared this document to guide you whether you need to use this component.

## Footer component

This component comes with some Pro configuration, you generally need to change its information.

```tsx
/**
 * background: '#f0f2f5'
 */
import React from "react";
import Footer from "@/components/Footer";

export default () => <Footer />;
```

## HeaderDropdown

HeaderDropdown antd Dropdown

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from "antd";
import React from "react";
import HeaderDropdown from "@/components/HeaderDropdown";

export default () => {
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="center">személyes központ</Menu.Item>
      <Menu.Item key="settings">Személyes beállítások</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">kijelentkezés</Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <Button>hover menü megjelenítése</Button>
    </HeaderDropdown>
  );
};
```

## HeaderSearch

An input box with completed data, which supports collapsing and expanding Input

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from "antd";
import React from "react";
import HeaderSearch from "@/components/HeaderSearch";

export default () => {
  return (
    <HeaderSearch
      placeholder="Site Search"
      defaultValue="umi ui"
      options={[
        { label: "Ant Design Pro", value: "Ant Design Pro" },
        {
          label: "Ant Design",
          value: "Ant Design",
        },
        {
          label: "Pro Table",
          value: "Pro Table",
        },
        {
          label: "Pro Layout",
          value: "Pro Layout",
        },
      ]}
      onSearch={(value) => {
        console.log("input", value);
      }}
    />
  );
};
```

### API

| parameter       | illustrate                                                                         | type                         | Defaults |
| --------------- | ---------------------------------------------------------------------------------- | ---------------------------- | -------- |
| value           | the value of the input box                                                         | `string`                     | -        |
| onChange        | Triggered after the value is modified                                              | `(value?: string) => void`   | -        |
| onSearch        | Triggered after query                                                              | `(value?: string) => void`   | -        |
| options         | list of options menu                                                               | `{label,value}[]`            | -        |
| defaultVisible  | Whether the input box is displayed by default, only the first time it takes effect | `boolean`                    | -        |
| visible         | Whether the input box is displayed                                                 | `boolean`                    | -        |
| onVisibleChange | The input box shows the hidden callback function                                   | `(visible: boolean) => void` | -        |

## NoticeIcon

The Notification Tool provides an interface that displays various notification messages.

```tsx
/**
 * background: '#f0f2f5'
 */
import { message } from "antd";
import React from "react";
import NoticeIcon from "@/components/NoticeIcon/NoticeIcon";

export default () => {
  const list = [
    {
      id: "000000001",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
      title: "14 új hetilapot kapott",
      datetime: "2017-08-09",
      type: "notification",
    },
    {
      id: "000000002",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
      title:
        "Az Ön által ajánlott Qu Nini túljutott az interjúk harmadik fordulóján",
      datetime: "2017-08-08",
      type: "notification",
    },
  ];
  return (
    <NoticeIcon
      count={10}
      onItemClick={(item) => {
        message.info(`${item.title} rákattintottak`);
      }}
      onClear={(title: string, key: string) =>
        message.info("Kattintson a továbbiak törléséhez")
      }
      loading={false}
      clearText="üres"
      viewMoreText="további információk"
      onViewMore={() =>
        message.info("Kattints ide a további információk megtekintéséhez")
      }
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={2}
        list={list}
        title="Értesítés"
        emptyText="Megnézte az összes értesítést"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={2}
        list={list}
        title="információ"
        emptyText="Az összes üzenetet elolvasta"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="Közelgő"
        emptyText="mindennel végeztél"
        count={2}
        list={list}
        showViewMore
      />
    </NoticeIcon>
  );
};
```

### NoticeIcon API

| parameter            | illustrate                                          | type                                                               | Defaults |
| -------------------- | --------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| count                | How many unread notifications there are             | `number`                                                           | -        |
| bell                 | bell diagram                                        | `ReactNode`                                                        | -        |
| onClear              | Click the Clear Data button                         | `(tabName: string, tabKey: string) => void`                        | -        |
| onItemClick          | Unread message column is clicked                    | `(item: API.NoticeIconData, tabProps: NoticeIconTabProps) => void` | -        |
| onViewMore           | View more button click                              | `(tabProps: NoticeIconTabProps, e: MouseEvent) => void`            | -        |
| onTabChange          | Notify tab switching                                | `(tabTile: string) => void;`                                       | -        |
| popupVisible         | Whether the notification is displayed or not        | `boolean`                                                          | -        |
| onPopupVisibleChange | Notification message shows hidden callback function | `(visible: boolean) => void`                                       | -        |
| clearText            | clear button text                                   | `string`                                                           | -        |
| viewMoreText         | See more button text                                | `string`                                                           | -        |
| clearClose           | Show clear button                                   | `boolean`                                                          | -        |
| emptyImage           | Bottom line when the list is empty                  | `ReactNode`                                                        | -        |

### NoticeIcon.Tab API

| parameter    | illustrate                              | type                                 | Defaults |
| ------------ | --------------------------------------- | ------------------------------------ | -------- |
| count        | How many unread notifications there are | `number`                             | -        |
| title        | Title of notification tab               | `ReactNode`                          | -        |
| showClear    | Show clear button                       | `boolean`                            | `true`   |
| showViewMore | show loading                            | `boolean`                            | `true`   |
| tabKey       | Unique key for Tab                      | `string`                             | -        |
| onClick      | Child's click event                     | `(item: API.NoticeIconData) => void` | -        |
| onClear      | Clear button click                      | `()=>void`                           | -        |
| emptyText    | test when empty                         | `()=>void`                           | -        |
| viewMoreText | See more button text                    | `string`                             | -        |
| onViewMore   | View more button click                  | `( e: MouseEvent) => void`           | -        |
| list         | list of notification messages           | `API.NoticeIconData`                 | -        |

### NoticeIconData

```tsx | pure
export interface NoticeIconData {
  id: string;
  key: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra: any;
  status: string;
}
```

## RightContent

RightContent is a combination of the above components, and the `SelectLang` plugin of plugins has been added.

```tsx | pure
<Space>
  <HeaderSearch
    placeholder="Site Search"
    defaultValue="umi ui"
    options={[
      {
        label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
        value: "umi ui",
      },
      {
        label: <a href="next.ant.design">Ant Design</a>,
        value: "Ant Design",
      },
      {
        label: <a href="https://protable.ant.design/">Pro Table</a>,
        value: "Pro Table",
      },
      {
        label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
        value: "Pro Layout",
      },
    ]}
  />
  <Tooltip title="Dokumentációval végzett munka">
    <span
      className={styles.action}
      onClick={() => {
        window.location.href = "https://pro.ant.design/docs/getting-started";
      }}
    >
      <QuestionCircleOutlined />
    </span>
  </Tooltip>
  <Avatar />
  {REACT_APP_ENV && (
    <span>
      <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
    </span>
  )}
  <SelectLang className={styles.action} />
</Space>
```
