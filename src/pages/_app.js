import '../../styles/globals.scss'
import Head from 'next/head'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../components/layout'))


function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>SmartWatt</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
