import Head from 'next/head'
import styles from '../../styles/modules/contact.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'



const Title = dynamic(() => import('../components/title'))

export default function Contact() {
  const router = useRouter()

  return (
      <>
      <Head>
        <title>SmartWatt | Contact</title>
      </Head>
      <Title title="Watt are you waiting for?" path={router.asPath} />
      <div>
        <h3 className={styles["h3"]}>Contact Me</h3>
        <p className={styles["contact-paragraph"]}>Please fill in the form below with your message. Thank you!</p>
        <div>
            <form className={styles["form-container"]}>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <input type="text" placeholder="Subject" />
                <textarea cols="30" rows="5" className={styles["message"]} placeholder="Message" />
            </form>
        </div>
      </div>
      </>
  )
}
