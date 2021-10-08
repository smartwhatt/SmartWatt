import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/modules/Home.module.scss'
import ReactTypingEffect from 'react-typing-effect';
import { Fade } from "react-awesome-reveal";

export default function Home() {

  return (
    <>
    <div className={styles.parallax}>
      <div className={styles["title"]}>
        <div className={styles["image"]}>
          <Image className={styles["img"]} src={"/img/profile.png"} width={240} height={240} objectFit='contain' alt={"This should've been where my picture is if it loads"}  />
        </div>
        <h1 className={styles["name"]}>Smart Wattanapornmongkol</h1>
        <h2 className={styles["subtext"]}><ReactTypingEffect text={["Fullstack Developer", "Cloud Engineer", "DevOps Engineer"]} speed={150} eraseSpeed={150} typingDelay={1000} /></h2>
      </div>
    </div>
    
    <div className={styles["section"]}>
      <Fade direction="up" cascade triggerOnce damping={0.1} >
        <h2 >Hi!</h2>
        <p>I am just a high school student at Suankularb Wittayalai School, Thailand, who is interested in software development and computer science. Currently, I am working mostly with Python in the field of Data Science and web development, with Django in the backend with Javascript frameworks like Next.js and React.js in the frontend.</p>
        <div className={styles["call2act"]}><Link href="/about">Learn more!</Link></div>
      </Fade>
    </div>

    <div className={styles["para"]}> 
      <div className={styles["section"], styles["right"]}>
        <Fade direction="up" cascade triggerOnce damping={0.1} >
          <h2>Methodology</h2>
          <p>Over the years, I have developed various of application and software to the point that I developed my programming style. I value speed in both process of developing and on runtime, so I often spend time optimizing the program while  making code easy to sustain and use multiple tools to improve the productivity.</p>
          <div className={styles["call2act"]}><Link href="/portfolio?type=Project">See how I code</Link></div>
        </Fade>
      </div>
    </div>
    </>
  )
}
