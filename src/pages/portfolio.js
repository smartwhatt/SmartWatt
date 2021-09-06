import Head from 'next/head'
import styles from '../../styles/modules/portfolio.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import firebase from "../libs/clientApp"
import {useCollection} from "react-firebase-hooks/firestore"
import { useEffect, useState } from 'react'
import Portcard from '../components/portcard'



const Title = dynamic(() => import('../components/title'))


export async function getServerSideProps(context) {
    const collection = await firebase.firestore().collection("type").orderBy("name", "asc");
    const items = (await collection.get()).docs;
    const data = items.map((item) => item.data())
    return {
      props: {data}, // will be passed to the page component as props
    }
  }

export default function Portfolio({data}) {
  const [menu, setMenu] = useState("All")
  const [ports, setPorts] = useState(null)
  const router = useRouter()
  const [work, loading, error ] = useCollection(
    firebase.firestore().collection("portfolio").orderBy("title", "asc"),
    {}
  )

  useEffect(() => {
    if (!loading && work){
        setPorts(work.docs.map((item) => item.data()));
    }
  }, [work, loading, error])

  useEffect(() => {
    setPorts(null);
    let isSubscribed = true;

    if (menu !== "All")
    firebase.firestore().collection("portfolio").where("type", "==", menu).orderBy("title", "asc").get()
    .then(items => {
        if (isSubscribed){
            const data = items.docs.map((item) => item.data());
            setPorts(data);
        }
    })
    else{
        firebase.firestore().collection("portfolio").orderBy("title", "asc").get()
        .then(items => {
            if (isSubscribed){
                const data = items.docs.map((item) => item.data());
                setPorts(data);
            }
        })
    
    }
    return () => (isSubscribed = false)

  }, [menu])
  
  return (
      <>
      <Head>
        <title>SmartWatt | Portfolio</title>
      </Head>
      <Title title="Best's Work" path={router.asPath} />
      <div className={styles["option-container"]}>
          <span onClick={() => setMenu("All")} className={`${styles["option-item"]} ${menu === "All" ? styles["active"] : null}`}>All</span>
          {data.map((type, index) => {
              return <span key={index} onClick={() => setMenu(type.name)} className={`${styles["option-item"]} ${menu === type.name ? styles["active"] : null}`}>{type.name}</span>
          })}
      </div>
      <div className={styles["work-container"]}>
          {ports !== null ? ports.map((port, index) => {
              return <Portcard key={index} item={port} />
          }) : <span>Loading...</span>}
      </div>
      </>
  )
}