import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Space } from 'antd';
import dayjs from 'dayjs';
import type { Category, Todo } from '../lib/api';

type Props = {
    initial?: Partial<Todo> | null;
    categories: Category[];
    onSubmit: (values: any) => Promise<void> | void;
    onCancel?: () => void;
};

export default function TodoForm({
                                     initial,
                                     categories,
                                     onSubmit,
                                     onCancel,
                                 }: Props) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initial) {
            const anyInitial = initial as any;
            const rawDue = anyInitial?.dueDate ?? anyInitial?.due_date;

            form.setFieldsValue({
                ...initial,
                dueDate: rawDue ? dayjs(rawDue) : undefined,
            });
        } else {
            form.resetFields();
        }
    }, [initial, form]);

    const handleFinish = (values: any) => {
        const payload = {
            ...initial,
            ...values,
            dueDate: values.dueDate ? values.dueDate.toISOString() : null,
        };
        return onSubmit(payload);
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please enter a title' }]}
            >
                <Input placeholder="Todo title" />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} placeholder="Short description" />
            </Form.Item>

            <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: 'Please select priority' }]}
            >
                <Select
                    placeholder="Select priority"
                    options={[
                        { label: 'Low', value: 'low' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'High', value: 'high' },
                    ]}
                />
            </Form.Item>

            <Form.Item label="Category" name="category_id">
                <Select
                    placeholder="Select category"
                    allowClear
                    options={categories.map((cat) => ({
                        label: cat.name,
                        value: cat.id,
                    }))}
                />
            </Form.Item>

            <Form.Item label="Due date" name="dueDate">
                <DatePicker
                    showTime
                    style={{ width: '100%' }}
                    placeholder="Select due date"
                />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                <Space>
                    {onCancel && <Button onClick={onCancel}>Cancel</Button>}
                    <Button htmlType="submit" type="primary">
                        Save
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
