import styles from '../../styles/modules/footer.module.scss'

// Import Icon
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { RiDiscordFill } from 'react-icons/ri';


export default function Footer() {
  return (
    <>
    <footer className={styles["footer-container"]} >
      <hr className={styles["divider"]} />
        <span className={styles["copyright"]}>&copy; Smart Wattanapornmongkol {new Date().getFullYear()}</span>
        <div className={styles["social"]}>
            <a title="Linkedin" href="https://www.linkedin.com/in/smart-wattanapornmongkol-b3b758207/"><AiFillLinkedin className={styles["icon"]} size={24} /></a>
            <a title="Discord" href="https://discord.com/users/508507551999197225"><RiDiscordFill className={styles["icon"]} size={24} /></a>
            <a title="Github" href="https://github.com/Jimmy-Tempest"><AiFillGithub className={styles["icon"]} size={24} /></a>
        </div>
    </footer>
    </>
  )
}