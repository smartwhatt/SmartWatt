import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from '../../styles/modules/Home.module.scss'
import ReactTypingEffect from 'react-typing-effect';
import { Fade } from "react-awesome-reveal";
import firebase from "../libs/clientApp"

const Portcard = dynamic(() => import('../components/portcard'))
const Skill = dynamic(() => import('../components/skill'))

export async function getServerSideProps(context) {
  let collection = await firebase.firestore().collection("portfolio").where("type", "==", "Project").orderBy("title", "asc").limit(4);
  let items = (await collection.get()).docs;
  const project = items.map((item) => item.data())

  collection = await firebase.firestore().collection("skills").where("pinned", "==", true).orderBy("name", "asc").limit(5);
  items = (await collection.get()).docs;
  const skills = items.map((item) => item.data())

  return {
    props: {project, skills}, // will be passed to the page component as props
  }
}

export default function Home({project, skills}) {
  // console.log(skills)
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
        <div className={styles["call2act"]}><Link href="/about"><a>Learn more!</a></Link></div>
      </Fade>
    </div>

    <div className={styles["para"]}> 
      <div className={styles["section"], styles["right"]}>
        <Fade direction="up" cascade triggerOnce damping={0.1} >
          <h2>Methodology</h2>
          <p>Over the years, I have developed various of application and software to the point that I developed my programming style. I value speed in both process of developing and on runtime, so I often spend time optimizing the program while  making code easy to sustain and use multiple tools to improve the productivity.</p>
          <div className={styles["call2act"]}><Link href="/portfolio?type=Project"><a>See how I code</a></Link></div>
        </Fade>
      </div>
    </div>

    <div className={styles["section"]}>
      <Fade direction="up" cascade triggerOnce damping={0.1} >
        <h2 >Projects I worked on</h2>
        <div className={styles["projects-container"]}>
          <Fade cascade triggerOnce damping={0.05} >
            {project.map((port, index) => {
                return <Portcard key={index} item={port} textOnly />
            })}
          </Fade>
        </div>
        <div className={styles["call2act"]}><Link href="/portfolio"><a>See more</a></Link></div>
      </Fade>
    </div>

    <div className={styles["section"], styles["right"]}>
        <Fade direction="up" cascade triggerOnce damping={0.1} >
          <h2>Tools I&apos;ve used</h2>
          <div className={styles["skills-container"]}>
            <Fade direction="right" triggerOnce={true} cascade damping={0.05}>
              {skills.map((skill, index) => {
                  return <Skill key={index} name={skill.name} src={skill.src}  />
                })}
            </Fade>
          </div>
          <div className={styles["call2act"]}><Link href="/about#skills"><a>There&apos;s more!</a></Link></div>
        </Fade>
      </div>
    </>
  )
}
