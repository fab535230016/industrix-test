const {
    snakeKeys,
    list,
    create,
} = require('/src/controllers/todo.controller');

const { Todo } = require('./src/models');

describe('snakeKeys', () => {
    it('converts camelCase keys to snake_case', () => {
        const input = { dueDate: '2025-01-01', categoryId: 1 };
        const result = snakeKeys(input);

        expect(result).toEqual({
            due_date: '2025-01-01',
            category_id: 1,
        });
    });

    it('keeps already-lowercase keys as they are', () => {
        const input = { title: 'Test', completed: false };
        const result = snakeKeys(input);

        expect(result).toEqual({
            title: 'Test',
            completed: false,
        });
    });
});

describe('list controller', () => {
    beforeEach(() => {
        Todo.findAndCountAll = jest.fn().mockResolvedValue({
            rows: [],
            count: 0,
        });
    });

    it('uses correct limit and offset for pagination', async () => {
        const req = {
            query: {
                page: '2',
                limit: '5',
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await list(req, res);

        expect(Todo.findAndCountAll).toHaveBeenCalledWith(
            expect.objectContaining({
                limit: 5,
                offset: 5,
            }),
        );

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                pagination: expect.objectContaining({
                    current_page: 2,
                    per_page: 5,
                    total: 0,
                    total_pages: 0,
                }),
            }),
        );
    });

    it('adds completed filter when completed=true is provided', async () => {
        const req = {
            query: {
                page: '1',
                limit: '10',
                completed: 'true',
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await list(req, res);

        expect(Todo.findAndCountAll).toHaveBeenCalled();

        const args = Todo.findAndCountAll.mock.calls[0][0];

        expect(args.where).toMatchObject({ completed: true });
    });
});

describe('create controller validation', () => {
    it('returns 400 when title is missing', async () => {
        const req = {
            body: {
                description: 'No title here',
                priority: 'high',
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'title required' });
    });

    it('returns 400 when priority is invalid', async () => {
        const req = {
            body: {
                title: 'Test invalid priority',
                priority: 'urgent',
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'invalid priority' });
    });
});
