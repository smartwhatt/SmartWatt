import styles from '../../styles/modules/skill.module.scss'
import Image from 'next/image'

export default function Skill(props) {
  return (
    <div className={styles["skill-container"]}>
        <span className={styles["skill-card"]}>{props.name}</span>
        <Image src={props.src} alt={props.name} width={100} height={100} />
    </div>
  )
}