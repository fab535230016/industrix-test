import React, { useState } from 'react';
import { Layout, Grid, Menu } from 'antd';
import TodoApp from '../components/TodoApp';

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

export default function HomePage() {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [statusFilter, setStatusFilter] = useState<
        'all' | 'completed' | 'uncompleted'
    >('all');

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: isMobile ? 18 : 24,
                    display: 'flex',
                    alignItems: 'center',
                    padding: isMobile ? '0 16px' : '0 32px',
                    letterSpacing: 0.4,
                    marginLeft: '-10px',
                    marginRight: '-10px',
                    marginTop: '-10px',
                }}
            >
                Fablius Maxleon — Todo List
            </Header>

            <Layout>
                <Sider
                    breakpoint="md"
                    collapsedWidth={isMobile ? 0 : 64}
                    width={200}
                    style={{
                        background: '#fff',
                        borderRight: '1px solid #f0f0f0',
                    }}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[statusFilter]}
                        onClick={({ key }) =>
                            setStatusFilter(key as 'all' | 'completed' | 'uncompleted')
                        }
                        items={[
                            { key: 'all', label: 'All Task' },
                            { key: 'completed', label: 'Completed Task' },
                            { key: 'uncompleted', label: 'Uncompleted Task' },
                        ]}
                        style={{ height: '100%', borderRight: 0, paddingTop: 16 }}
                    />
                </Sider>

                <Content
                    style={{
                        padding: isMobile ? 16 : 30,
                        background: '#f5f5f5',
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1100,
                            margin: isMobile ? '16px auto 24px' : '24px auto 32px',
                        }}
                    >
                        <TodoApp statusFilter={statusFilter} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
