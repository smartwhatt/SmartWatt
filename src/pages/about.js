import Head from 'next/head'
import styles from '../../styles/modules/about.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
const Title = dynamic(() => import('../components/title'))
import { Radar } from 'react-chartjs-2';

export default function About() {
    const router = useRouter()

    const data = {
        labels: ['Git', 'Python', 'Javascripts', 'Keras', 'Docker', 'C++'],
        datasets: [
          {
            label: 'Level of Comfortability',
            data: [8, 9, 7, 6, 7, 7],
            backgroundColor: 'rgba(255, 217, 150, 0.5)',
            borderColor: '#ffb433',
            borderWidth: 1,
          },
        ],
      };
      const options = {
        scale: {
            ticks: {
                beginAtZero: true,
                max: 10,
                min: 0,
                stepSize: 1
            }
        
        },
      };
    

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
        <Radar data={data} options={options}/>
        </div>
      </div>
      </>
  )
}
