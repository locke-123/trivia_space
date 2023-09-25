import '@/styles/globals.css'
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app'
import theme_basic from '@/styles/theme/themeConfig';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme_basic}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
