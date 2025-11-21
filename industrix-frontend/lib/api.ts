import axios, { AxiosResponse } from 'axios';

export type Category = { id: number; name: string; color?: string; createdAt?: string; updatedAt?: string };
export type Todo = {
    id?: number;
    title: string;
    description?: string;
    completed?: boolean;
    priority?: 'high' | 'medium' | 'low' | string;
    dueDate?: string | null;
    due_date?: string | null;
    categoryId?: number | null;
    category?: Category | null;
    createdAt?: string;
    updatedAt?: string;
};
export type Pagination = { current_page: number; per_page: number; total: number; total_pages: number };

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000
});

export default {
    listTodos: (params?: Record<string, any>) => apiClient.get<{ data: Todo[]; pagination: Pagination }>('/api/todos', { params }) as Promise<AxiosResponse<{ data: Todo[]; pagination: Pagination }>>,
    getTodo: (id: number) => apiClient.get<Todo>(`/api/todos/${id}`),
    createTodo: (data: Partial<Todo>) => apiClient.post<Todo>('/api/todos', data),
    updateTodo: (id: number, data: Partial<Todo>) => apiClient.put<Todo>(`/api/todos/${id}`, data),
    deleteTodo: (id: number) => apiClient.delete(`/api/todos/${id}`),
    toggleTodo: (id: number) => apiClient.patch<Todo>(`/api/todos/${id}/complete`),

    listCategories: () => apiClient.get<Category[]>('/api/categories'),
    createCategory: (data: Partial<Category>) => apiClient.post<Category>('/api/categories', data),
    updateCategory: (id: number, data: Partial<Category>) => apiClient.put<Category>(`/api/categories/${id}`, data),
    deleteCategory: (id: number) => apiClient.delete(`/api/categories/${id}`)
};
