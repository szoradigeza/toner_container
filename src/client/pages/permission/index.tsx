import { LocaleFormatter } from '../../locales';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import React, { useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import OperationModal from './components/OperationModal';
import { useCreate, useUpdate } from '@/api/request';
import { useBatchDeleteProject, useGetProjects } from '@client/api';

const TableList = () => {
    const addBtn = useRef(null);

    const [done, setDone] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [projects, setProjects] = useState<API.Project[]>();
    const [filters, setFilters] = useState<API.Project[]>();
    const [current, setCurrent] = useState<Partial<API.Project> | undefined>(undefined);

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const [pagination, setPagination] = useState<{}>({
        current: 1,
        pageSize: 10
    });

    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState<API.Project[]>([]);

    const { data, error, isLoading, refetch } = useGetProjects(pagination, filters);

    const { mutateAsync } = useCreate<API.Project, API.Project>('/projects');
    const { mutateAsync: update } = useUpdate<API.Project>('/projects');
    const { mutateAsync: batchDelete } = useBatchDeleteProject();

    useEffect(() => {
        setProjects(data?.list);
        setPagination({
            ...pagination,
            total: data?.total,
            showQuickJumper: true
        });
    }, [data]);

    useEffect(() => {
        refetch();
    }, [filters]);

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

        const hide = message.loading('Hozz??ad??s/Meg??j??t??s');
        try {
            if (values.id === 0) {
                await addProject(values);
            } else {
                await updateProject(values);
            }

            hide();

            message.success('Sikeres m??velet');
            refetch();

            return true;
        } catch (error) {
            hide();
            message.error('A m??velet nem siker??lt, pr??b??lja ??jra!');
            return false;
        }
    };
    /**
     * ????????????
     *
     * @param selectedRows
     */
    const handleRemove = async (selectedRows: API.Project[]) => {
        const hide = message.loading('T??rl??s');
        if (!selectedRows) return true;
        try {
            await batchDelete(selectedRows.map((row) => row.id));
            hide();
            message.success('Sikeresen t??r??lve, hamarosan friss??l');
            return true;
        } catch (error) {
            hide();
            message.error('A t??rl??s nem siker??lt, pr??b??lkozzon ??jra');
            return false;
        }
    };

    const columns: ProColumns<API.Project>[] = [
        {
            title: 'title',
            dataIndex: 'name',
            tip: 'A projekt neve egyedi kulcs',
            search: {
                transform: (value) => {
                    return {
                        filter: 'name:eq:' + value
                    };
                }
            },
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
            }
        },
        {
            title: 'title',
            dataIndex: 'description',
            valueType: 'textarea',
            search: {
                transform: (value) => {
                    return {
                        filter: 'description:eq:' + value
                    };
                }
            }
        },
        {
            title: 'title',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="edit"
                    onClick={(e) => {
                        e.preventDefault();
                        showEditModal(record);
                    }}
                >
                    gloabal.tips.modify
                </a>,
                <a
                    key="delete"
                    onClick={(e) => {
                        e.preventDefault();
                        Modal.confirm({
                            title: 'elem t??rl??se',
                            content: 'Biztosan t??rli ezt az elemet?',
                            okText: 'Meger??s??t',
                            cancelText: 'M??gse',
                            onOk: async () => {
                                await handleRemove([{ ...record }]);
                                setSelectedRows([]);
                                refetch();
                            }
                        });
                    }}
                >
                    title: "title",
                </a>
            ]
        }
    ];

    return (
        <PageContainer>
            <ProTable<API.Project>
                headerTitle={'headerTitle'}
                actionRef={actionRef}
                rowKey="id"
                options={{ reload: false }}
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={showModal}>
                        <PlusOutlined /> <LocaleFormatter id="gloabal.tips.create" />
                    </Button>
                ]}
                request={undefined}
                dataSource={projects}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    }
                }}
                search={{
                    defaultCollapsed: false,
                    optionRender: ({ searchText, resetText }, { form }) => [
                        <Button
                            key="search"
                            type="primary"
                            onClick={() => {
                                // form?.submit();
                                console.log('search submit');
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
                        </Button>
                    ]
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            <LocaleFormatter id="app.project.chosen" defaultMessage="V??lasztott" />{' '}
                            <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
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
