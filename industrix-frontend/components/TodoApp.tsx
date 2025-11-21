import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Space,
    Tag,
    Popconfirm,
    Input,
    message,
    Row,
    Col,
    Modal,
    Grid,
    Drawer,
    Card,
    Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import api, { Todo, Category, Pagination } from '../lib/api';
import TodoForm from './TodoForm';
import dayjs from 'dayjs';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const DEFAULT_PAGINATION: Pagination = {
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
};

type TodoAppProps = {
    statusFilter?: 'all' | 'completed' | 'uncompleted';
};

export default function TodoApp({ statusFilter = 'all' }: TodoAppProps) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] =
        useState<Pagination>(DEFAULT_PAGINATION);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const loadCategories = async () => {
        try {
            const res = await api.listCategories();
            setCategories(res.data);
        } catch (error) {
            console.error(error);
            message.error('Failed to load categories');
        }
    };

    const loadTodos = async (
        page: number = 1,
        perPage: number = pagination.per_page || DEFAULT_PAGINATION.per_page,
        q: string = search,
        status: 'all' | 'completed' | 'uncompleted' = statusFilter,
    ) => {
        setLoading(true);
        try {
            const params: any = { page, limit: perPage, search: q };

            if (status === 'completed') {
                params.completed = true;
            } else if (status === 'uncompleted') {
                params.completed = false;
            }

            const res = await api.listTodos(params);
            setTodos(res.data.data);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error(error);
            message.error('Failed to load todos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
        loadTodos(1, DEFAULT_PAGINATION.per_page, '', statusFilter);
    }, [statusFilter]);

    const handleSearch = (value: string) => {
        setSearch(value);
        loadTodos(1, pagination.per_page, value, statusFilter);
    };

    const openCreate = () => {
        setEditingTodo(null);
        setModalOpen(true);
    };

    const openEdit = (todo: Todo) => {
        setEditingTodo(todo);
        setModalOpen(true);
    };

    const handleCreateOrUpdate = async (values: any) => {
        try {
            if (editingTodo && editingTodo.id) {
                await api.updateTodo(editingTodo.id, values);
                message.success('Todo updated');
            } else {
                await api.createTodo(values);
                message.success('Todo created');
            }
            setModalOpen(false);
            loadTodos(pagination.current_page, pagination.per_page, search, statusFilter);
        } catch (error) {
            console.error(error);
            message.error('Failed to save todo');
        }
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        try {
            await api.deleteTodo(id);
            message.success('Todo deleted');
            loadTodos(pagination.current_page, pagination.per_page, search, statusFilter);
        } catch (error) {
            console.error(error);
            message.error('Failed to delete todo');
        }
    };

    const handleToggle = async (id?: number) => {
        if (!id) return;
        try {
            await api.toggleTodo(id);
            message.success('Todo updated');
            loadTodos(pagination.current_page, pagination.per_page, search, statusFilter);
        } catch (error) {
            console.error(error);
            message.error('Failed to update todo');
        }
    };

    const columns: ColumnsType<Todo> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            responsive: ['md'],
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority: string) => (
                <Tag
                    bordered={false}
                    style={{ textTransform: 'capitalize' }}
                    color={
                        priority === 'high'
                            ? 'red'
                            : priority === 'medium'
                                ? 'orange'
                                : 'green'
                    }
                >
                    {priority}
                </Tag>
            ),
        },
        {
            title: 'Category',
            key: 'category',
            render: (_: any, row: Todo) =>
                row.category ? (
                    <Tag bordered={false} color={row.category.color}>
                        {row.category.name}
                    </Tag>
                ) : null,
            responsive: ['sm'],
        },
        {
            title: 'Due',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (value: string | null) =>
                value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
            responsive: ['sm'],
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            key: 'completed',
            responsive: ['md'],
            render: (_: boolean, row: Todo) => (
                <Button
                    type="link"
                    size="small"
                    onClick={() => handleToggle(row.id)}
                >
                    {row.completed ? 'Yes' : 'No'}
                </Button>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, row: Todo) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openEdit(row)}
                    />
                    <Popconfirm
                        title="Delete this todo?"
                        onConfirm={() => handleDelete(row.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const tablePagination = {
        current: pagination.current_page,
        pageSize: pagination.per_page,
        total: pagination.total,
        onChange: (page: number, pageSize: number) =>
            loadTodos(page, pageSize, search, statusFilter),
    };

    const formNode = (
        <TodoForm
            categories={categories}
            initial={editingTodo || undefined}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setModalOpen(false)}
        />
    );

    return (
        <>
            <Card
                bordered={false}
                style={{
                    borderRadius: 18,
                    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
                }}
                bodyStyle={{ padding: isMobile ? 16 : 24 }}
            >
                <Space
                    direction="vertical"
                    size={isMobile ? 16 : 20}
                    style={{ width: '100%' }}
                >
                    <Row justify="space-between" align="middle" gutter={[16, 16]}>
                        <Col xs={24} md="auto">
                            <Space direction="vertical" size={4}>
                                <Title
                                    level={4}
                                    style={{ margin: 0, letterSpacing: 0.3 }}
                                >
                                    Todo List
                                </Title>
                                <Text type="secondary">
                                    Manage your daily tasks and priorities
                                </Text>
                            </Space>
                        </Col>
                        <Col xs={24} md="auto">
                            <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={openCreate}
                                >
                                    New Todo
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Input.Search
                                placeholder="Search todos by title or description"
                                onSearch={handleSearch}
                                allowClear
                                size="large"
                            />
                        </Col>
                    </Row>

                    <Table
                        size="middle"
                        rowKey="id"
                        columns={columns}
                        dataSource={todos}
                        loading={loading}
                        pagination={tablePagination}
                        scroll={{ x: true }}
                    />
                </Space>
            </Card>

            {isMobile ? (
                <Drawer
                    open={modalOpen}
                    title={editingTodo ? 'Edit Todo' : 'New Todo'}
                    onClose={() => setModalOpen(false)}
                    destroyOnClose
                    width="100%"
                >
                    {formNode}
                </Drawer>
            ) : (
                <Modal
                    open={modalOpen}
                    title={editingTodo ? 'Edit Todo' : 'New Todo'}
                    footer={null}
                    onCancel={() => setModalOpen(false)}
                    destroyOnClose
                >
                    {formNode}
                </Modal>
            )}
        </>
    );
}
