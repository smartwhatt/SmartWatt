import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/modules/Home.module.scss'
import ReactTypingEffect from 'react-typing-effect';

export default function Home() {

  return (
    <div className={styles.parallax}>
      <div className={styles["title"]}>
        <div className={styles["image"]}>
        <Image src={"/img/profile.png"} width={240} height={240} objectFit='contain' />
        </div>
        <h1 className={styles["name"]}>Smart Wattanapornmongkol</h1>
        <h2 className={styles["subtext"]}><ReactTypingEffect text={["Fullstack Developer", "Cloud Engineer", "DevOps Engineer"]} speed={150} eraseSpeed={150} typingDelay={1000} /></h2>
      </div>
    </div>
  )
}
