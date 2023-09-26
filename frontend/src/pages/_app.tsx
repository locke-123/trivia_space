import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { ConfigProvider } from 'antd';
import theme_basic from '@/styles/theme/themeConfig';

export default function App({ session, Component, ...pageProps }: any) {
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <ConfigProvider theme={theme_basic}>
          <Component {...pageProps} />
        </ConfigProvider>
      </SessionProvider>
    </>
  )
}
