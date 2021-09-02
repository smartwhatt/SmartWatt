import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/modules/Home.module.scss'
import {useEffect, useRef} from "react";

export default function Home() {

  return (
    <div className={styles.parallax}>
      <h1>Smart Wattanapornmongkol</h1>
      <h2>Fullstack Cloud Developer</h2>
    </div>
  )
}
