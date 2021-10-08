import Head from 'next/head'
import styles from '../../styles/modules/about.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import firebase from "../libs/clientApp"

import { Fade } from "react-awesome-reveal";


const Title = dynamic(() => import('../components/title'))
const Skill = dynamic(() => import('../components/skill'))

export async function getServerSideProps(context) {
  const collection = await firebase.firestore().collection("skills").orderBy("name", "asc");
  const items = (await collection.get()).docs;
  const data = items.map((item) => item.data())
  return {
    props: {data}, // will be passed to the page component as props
  }
}

export default function About({data}) {
  const router = useRouter()
  // const [skills, loading, error ] = useCollection(
  //   firebase.firestore().collection("skills").orderBy("name", "asc"),
  //   {}
  // )

  return (
      <>
      <Head>
        <title>SmartWatt | About</title>
      </Head>
      <Title title="About Smart" path={router.asPath} />
        <div>
        <Fade direction="up" cascade triggerOnce={true} damping={0.1} >
              <h3 className={styles["h3"]}>About Me</h3>
              <p className={styles["paragraph"]}>My name is Smart Wattanapornmongkol and my nickname is Best (yes my name is both Best and Smart) but people often call me Jimmy (Very random, I know). I am currently studying in Eplus+ program at Suankularb Wittayalai School, Thailand.</p>
              <p className={styles["paragraph"]}>I considered myself a fullstack developer, but sometimes I also work with AI and machine learning. Though, I am willing to try doing other things as well.</p>
              <p className={styles["paragraph"]}>I got into programming while I was in grade 7. I was introduced to python programming by my classmate’s father who is software engineer.  I have been into programming for {new Date().getFullYear() - 2017} years. Now, I am working with various programming language and frameworks, mainly Javascript’s Next.js and Python’s Django.</p>
        </Fade>
        </div>
      
      <div>
        <Fade direction="up" triggerOnce={true}>
          <h3 className={styles["h3"]}>Expertise</h3>
          <p className={styles["expertise-paragraph"]}>I have experience with many tools and programming language which I listed some that I comfortable with below</p>
        </Fade>
          <div className={styles["skills"]}>
          <Fade  triggerOnce={true} cascade damping={0.05}>
            {data.map((skill, index) => {
              return <Skill key={index} name={skill.name} src={skill.src}  />
            })}
          </Fade>
          </div>
      </div>
      
      </>
  )
}
