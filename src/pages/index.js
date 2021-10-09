import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from '../../styles/modules/Home.module.scss'
import ReactTypingEffect from 'react-typing-effect';
import { Fade } from "react-awesome-reveal";
import firebase from "../libs/clientApp"
import { BiLinkExternal } from "react-icons/bi"
import { FcGraduationCap, FcKindle } from "react-icons/fc"
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter, AiOutlineMail } from "react-icons/ai"
import { FaDiscord } from "react-icons/fa"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
 
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
        <div className={styles["call2act"]}><Link href="/about"><a><BiLinkExternal className={styles["icon"]} /> Learn more!</a></Link></div>
      </Fade>
    </div>

    <div className={styles["para"]}> 
      <div className={styles["section"], styles["right"]}>
        <Fade direction="up" cascade triggerOnce damping={0.1} >
          <h2>Methodology</h2>
          <p>Over the years, I have developed various of application and software to the point that I developed my programming style. I value speed in both process of developing and on runtime, so I often spend time optimizing the program while  making code easy to sustain and use multiple tools to improve the productivity.</p>
          <div className={styles["call2act"]}><Link href="/portfolio?type=Project"><a><BiLinkExternal className={styles["icon"]} /> See how I code</a></Link></div>
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
        <div className={styles["call2act"]}><Link href="/portfolio"><a><BiLinkExternal className={styles["icon"]} /> See more</a></Link></div>
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
        <div className={styles["call2act"]}><Link href="/about#skills"><a><BiLinkExternal className={styles["icon"]} /> There&apos;s more!</a></Link></div>
      </Fade>
    </div>

    <div className={styles["section"] + " " + styles["center"]}>
      <Fade direction="up" cascade triggerOnce damping={0.1} >
        <h2 >Education Path</h2>
        <VerticalTimeline className="edu-timeline" align="alternate">
          {/* <Fade cascade triggerOnce damping={0.1} > */}
            <VerticalTimelineElement className={styles["node"]} icon={<FcGraduationCap />} iconStyle={{ background: '#fff', color: '#fff' }}>
              <h3>2009 - 2011</h3>
              <h4>Attended Kindergarden at Sunflower Trilingual School</h4>
            </VerticalTimelineElement>

            <VerticalTimelineElement className={styles["node"]} icon={<FcGraduationCap />} iconStyle={{ background: '#fff', color: '#fff' }}>
              <h3>2011 - 2017</h3>
              <h4>Attended 3rd year of Kindergarden and Primary School at Attaphiwat School</h4>
            </VerticalTimelineElement>

            <VerticalTimelineElement className={styles["node"]} icon={<FcGraduationCap />} iconStyle={{ background: '#fff', color: '#fff' }}>
              <h3>2017 - 2021</h3>
              <h4>Attended Junior Highschool at Suankularb Wittayalai School's Eplus+ Program</h4>
            </VerticalTimelineElement>

            <VerticalTimelineElement className={styles["node"]} icon={<FcKindle />} iconStyle={{ background: '#fff', color: '#fff' }}>
              <h3>2021 - Present</h3>
              <h4>Continue attending Highschool at Suankularb Wittayalai School's Eplus+ Program</h4>
            </VerticalTimelineElement>
          {/* </Fade> */}
        </VerticalTimeline>
        {/* <div className={styles["call2act"]}><Link href="/portfolio"><a><BiLinkExternal className={styles["icon"]} /> See Full Timeline</a></Link></div> */}
      </Fade>
    </div>

    <div className={styles["section"]}>
      <Fade direction="up" cascade triggerOnce damping={0.1} >
        <h2 >Social Media</h2>
        <div className={styles["skills-container"]}>
          <Fade direction="right" triggerOnce={true} cascade damping={0.05}>
            <a href="https://github.com/Jimmy-Tempest" target="_blank">
              <div title={"Github"} className={styles["social-container"]}>
                  <span className={styles["social-card"]}>@Jimmy-Tempest</span>
                  <AiFillGithub size={75} className={styles["social-logo"]} />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/smart-wattanapornmongkol-b3b758207/" target="_blank">
              <div title={"Linkedin"} className={styles["social-container"]}>
                  <span className={styles["social-card"]}>Smart Wattanapornmongkol</span>
                  <AiFillLinkedin size={75} className={styles["social-logo"]} />
              </div>
            </a>
            <a href="https://discord.com/users/508507551999197225" target="_blank">
              <div title={"Discord"} className={styles["social-container"]}>
                  <span className={styles["social-card"]}>@Jimmy_Tempest#7862</span>
                  <FaDiscord size={75} className={styles["social-logo"]} />
              </div>
            </a>
            <a href="https://twitter.com/Jimmy_Tempest" target="_blank">
              <div title={"Twitter"} className={styles["social-container"]}>
                  <span className={styles["social-card"]}>@Jimmy_Tempest</span>
                  <AiOutlineTwitter size={75} className={styles["social-logo"]} />
              </div>
            </a>
            <a href="mailto:smartwattana@gmail.com" target="_blank">
              <div title={"Email"} className={styles["social-container"]}>
                  <span className={styles["social-card"]}>smartwattana@gmail.com</span>
                  <AiOutlineMail size={75} className={styles["social-logo"]} />
              </div>
            </a>
          </Fade>
        </div>
        
        {/* <div className={styles["call2act"]}><Link href="/portfolio"><a><BiLinkExternal className={styles["icon"]} /> See Full Timeline</a></Link></div> */}
      </Fade>
    </div>
    </>
  )
}
