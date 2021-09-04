import Head from 'next/head'
import styles from '../../styles/modules/about.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import firebase from "../firebase/clientApp"
import {useCollection} from "react-firebase-hooks/firestore"



const Title = dynamic(() => import('../components/title'))
const Skill = dynamic(() => import('../components/skill'))

export default function About() {
  const router = useRouter()
  const [skills, loading, error ] = useCollection(
    firebase.firestore().collection("skills").orderBy("name", "asc"),
    {}
  )

  return (
      <>
      <Head>
        <title>SmartWatt | About</title>
      </Head>
      <Title title="About Smart" path={router.asPath} />
      <div>
          <h3 className={styles["h3"]}>About Me</h3>
          <p className={styles["paragraph"]}>I am just a high school student at Suankularb Wittayalai School, Thailand, who is interested in software development and computer science. Currently, I am working mostly with Python in field of Data Science and some web development with Django and Javascript framework like Nextjs and Reactjs.</p>
      </div>
      <div>
        <h3 className={styles["h3"]}>Expertise</h3>
        <p className={styles["expertise-paragraph"]}>I have experience with many tools and programming language which I listed some that I comfortable with below</p>
        <div className={styles["skills"]}>
          {!loading ? skills.docs.map((skill, index) => {
            return <Skill key={index} name={skill.data().name} src={skill.data().src} />
          }) : <span>Loading...</span>}
        </div>
      </div>
      </>
  )
}
