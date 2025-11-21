import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider locale={enUS} theme={{ token: { colorPrimary: '#667eea', borderRadius: 12 }}}>
            <Component {...pageProps} />
        </ConfigProvider>
    );
}
