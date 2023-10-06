import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import HeaderComponent from '@/components/mainPage/header/header_component'
import AboutComponent from '@/components/mainPage/about/about_component'

export default function Home() {
  return (
    <>
      <Head>
        <title>Trivia Space</title>
        <meta name="description" content="실시간 상식 퀴즈 대결 웹사이트 Trivia Space" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HeaderComponent />
        <AboutComponent />
      </main>
    </>
  )
}