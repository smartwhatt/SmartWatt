import Head from 'next/head'
import styles from '../../styles/modules/portfolio.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import firebase from "../firebase/clientApp"
import {useCollection} from "react-firebase-hooks/firestore"
import { useState } from 'react'



const Title = dynamic(() => import('../components/title'))

export default function Portfolio() {
  const [menu, setMenu] = useState("All")
  const router = useRouter()
  const [types, typesLoading, typesError ] = useCollection(
    firebase.firestore().collection("type").orderBy("name", "asc"),
    {}
  )

  return (
      <>
      <Head>
        <title>SmartWatt | Portfolio</title>
      </Head>
      <Title title="Best's Work" path={router.asPath} />
      <div className={styles["option-container"]}>
          <span onClick={() => setMenu("All")} className={`${styles["option-item"]} ${menu === "All" ? styles["active"] : null}`}>All</span>
          {!typesLoading && !typesError ? types.docs.map((type, index) => {
              return <span kry={index} onClick={() => setMenu(type.data().name)} className={`${styles["option-item"]} ${menu === type.data().name ? styles["active"] : null}`}>{type.data().name}</span>
          }) : null}
      </div>
      </>
  )
}
