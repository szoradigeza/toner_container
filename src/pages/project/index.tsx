import { LocaleFormatter } from "@/locales";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, message, Modal, PaginationProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import OperationModal from "./components/OperationModal";
import {
  useAddProject,
  useBatchDeleteProject,
  useGetProjects,
  useUpdateProject,
} from "@/api";

const TableList = () => {
  const addBtn = useRef(null);

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<API.Project[]>();
  const [filters, setFilters] = useState<API.Project[]>();
  const [current, setCurrent] = useState<Partial<API.Project> | undefined>(
    undefined
  );

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [pagination, setPagination] = useState<Partial<PaginationProps>>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Project[]>([]);

  const { data, error, isLoading, refetch } = useGetProjects(
    pagination,
    filters
  );

  const { mutateAsync } = useAddProject();
  const { mutateAsync: update } = useUpdateProject();
  const { mutateAsync: batchDelete } = useBatchDeleteProject();

  useEffect(() => {
    setProjects(data?.list);
    setPagination({
      ...pagination,
      total: data?.total,
      showQuickJumper: true,
    });
  }, [data]);

  useEffect(() => {
    refetch();
  }, [pagination.current, pagination.pageSize, filters]);

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: API.Project) => {
    setVisible(true);
    setCurrent(item);
  };

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const addProject = async (data: API.Project) => {
    await mutateAsync(data);
  };
  const updateProject = async (data: API.Project) => {
    await update(data);
  };
  const handleSubmit = async (values: API.Project) => {
    values.id = current && current.id ? current.id : 0;

    setAddBtnblur();
    setVisible(false);

    const hide = message.loading("Hozzáadás/Frissítés");
    try {
      if (values.id === 0) {
        await addProject(values);
      } else {
        await updateProject(values);
      }

      hide();

      message.success("A művelet sikeres!");
      refetch();

      return true;
    } catch (error) {
      hide();
      message.error("A művelet nem sikerült, próbálja újra!");
      return false;
    }
  };
  /**
   * 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.Project[]) => {
    const hide = message.loading("Törlés");
    if (!selectedRows) return true;
    try {
      await batchDelete(selectedRows.map((row) => row.id));
      setPagination({ ...pagination, current: 1 });
      hide();
      message.success("Sikeresen törölve, hamarosan frissül");
      return true;
    } catch (error) {
      hide();
      message.error("A törlés nem sikerült, próbálkozzon újra");
      return false;
    }
  };

  const columns: ProColumns<API.Project>[] = [
    {
      title: "project",
      dataIndex: "name",
      tip: "A projekt neve egyedi kulcs",
      sorter: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrent(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "description",
      dataIndex: "description",
      valueType: "textarea",
      sorter: true,
    },
    {
      title: "operation",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => [
        <a
          key="edit"
          onClick={(e) => {
            e.preventDefault();
            showEditModal(record);
          }}
        >
          modify
        </a>,
        <a
          key="delete"
          onClick={(e) => {
            e.preventDefault();
            Modal.confirm({
              title: "elem törlése",
              content: "Biztosan törli ezt az elemet?",
              okText: "megerősít",
              cancelText: "Megszüntetés",
              onOk: async () => {
                await handleRemove([{ ...record }]);
                setSelectedRows([]);
                refetch();
              },
            });
          }}
        >
          delete
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Project>
        headerTitle={"headerTitle"}
        actionRef={actionRef}
        rowKey="id"
        options={{ reload: false }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> <LocaleFormatter id="gloabal.tips.create" />
          </Button>,
        ]}
        request={undefined}
        dataSource={projects}
        columns={columns}
        pagination={pagination}
        onChange={(pagination, filters, sorter) => {
          setPagination(pagination);
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        search={{
          defaultCollapsed: false,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                // form?.submit();
                console.log("search submit");
                setFilters(form?.getFieldsValue());
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="reset"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
          ],
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <LocaleFormatter
                id="app.project.chosen"
                defaultMessage="választott"
              />{" "}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{" "}
              <LocaleFormatter id="app.project.item" defaultMessage="Elem" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              refetch();
            }}
          >
            <LocaleFormatter id="app.project.batchDeletion" />
          </Button>
        </FooterToolbar>
      )}

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default TableList;
