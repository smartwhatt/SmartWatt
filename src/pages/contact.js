import Head from 'next/head'
import styles from '../../styles/modules/contact.module.scss'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import { useState } from 'react'



const Title = dynamic(() => import('../components/title'))

export default function Contact() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    if (name.trim() === "" || email.trim() === "" || subject.trim() === "" || body.trim() === "")
      return false
    const data = {
      name,
      email,
      subject,
      body
    }
    fetch("/api/contact", {
      method:"POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },  
      body:JSON.stringify(data)
    }).then(res => {
      if (res.ok){
        setName('')
        setEmail('')
        setBody('')
        setSubject('')
        setSent(true)
      }
    })
  }


  return (
      <>
      <Head>
        <title>SmartWatt | Contact</title>
      </Head>
      <Title title="Watt are you waiting for?" path={router.asPath} />
      <div>
        {sent ? <div className={styles["alert"]}>Thank you for reaching out to me! I will email you back as soon as possible.</div> : null}
        <h3 className={styles["h3"]}>Contact Me</h3>
        <p className={styles["contact-paragraph"]}>Please fill in the form below with your message. Thank you!</p>
        <div>
            <form className={styles["form-container"]} onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <textarea cols="30" rows="5" className={styles["message"]} placeholder="Message" value={body} onChange={(e) => setBody(e.target.value)} />
                <div className={styles["submit"]}>
                  <button type="submit">Send</button>
                </div>
            </form>
        </div>
      </div>
      </>
  )
}
