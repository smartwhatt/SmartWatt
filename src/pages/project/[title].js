import Head from 'next/head'
import styles from '../../../styles/modules/project.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import firebase from "../../libs/clientApp"
import { useEffect, useState } from 'react'
// import { Octokit } from "@octokit/core";
// import {useCollection} from "react-firebase-hooks/firestore"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const Title = dynamic(() => import('../../components/title'))

export async function getServerSideProps(context) {
    const params = context.query
    const collection = await firebase.firestore().collection("portfolio").where("title", "==", context.query.title)
    const items = (await collection.get()).docs;
    const data = items.map((item) => item.data())
    
    return {
      props: {params, data}, // will be passed to the page component as props
    }
  }

export default function Project({params, data}) {
  const router = useRouter()
  const project = data[0]
  const [content, setContent] = useState("")
//   const [skills, loading, error ] = useCollection(
//     firebase.firestore().collection("skills").orderBy("name", "asc"),
//     {}
//   )
  useEffect(() => {
      getMarkdown()
      if (data.length === 0)
      router.push("/404")
  }, [])

  function getMarkdown(){
    fetch(project.readme).then(res => res.text()).then(content => setContent(content))
  }

  return (
      <>
      <Head>
        <title>SmartWatt | {params.title}</title>
      </Head>
      <Title title={params.title} path={decodeURI(router.asPath)} />
      <div className={styles["info-container"]}>
          <div className={styles["header-container"]}>
            <span>{project.title}</span>
            <span><a href={project.github} target="_blank" rel="noreferrer" >{project.github}</a></span>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}> {content} </ReactMarkdown>
      </div>
      </>
  )
}
