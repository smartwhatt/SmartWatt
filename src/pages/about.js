import Head from 'next/head'
import styles from '../../styles/modules/about.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
const Title = dynamic(() => import('../components/title'))

export default function About() {
    const router = useRouter()
  


  return (
      <>
      <Title title="About Smart" path={router.asPath} />
      <div>
          <h3 className={styles["h3"]}>About Me</h3>
          <p className={styles["paragraph"]}>I am just a high school student at Suankularb Wittayalai School, Thailand, who is interested in software development and computer science. Currently, I am working mostly with Python in field of Data Science and some web development with Django and Javascript framework like Nextjs and Reactjs.</p>
      </div>
      <div>
        <h3 className={styles["h3"]}>Expertise</h3>
        <p className={styles["expertise-paragraph"]}>I have experience with many tools and programming language which I listed some that I comfortable with below</p>
        <div className={styles["chart"]}>
        {/* <Radar data={data} options={options} width={960} height={960} plugins={[plugins]} /> */}
        </div>
      </div>
      </>
  )
}
