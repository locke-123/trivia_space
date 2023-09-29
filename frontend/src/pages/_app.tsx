import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { ConfigProvider } from 'antd';
import theme_basic from '@/styles/theme/themeConfig';
import { RecoilRoot } from 'recoil';

export default function App({ session, Component, ...pageProps }: any) {
  return (
    <>
      <RecoilRoot>
        <SessionProvider session={session} refetchInterval={5 * 60}>
          <ConfigProvider theme={theme_basic}>
            <Component {...pageProps} />
          </ConfigProvider>
        </SessionProvider>
      </RecoilRoot>
    </>
  )
}
