import styles from '../../styles/modules/title.module.scss'
import Link from 'next/link'


export default function Title(props) {
  return (
    <div className={styles["title-container"]}>
        <div className={styles["title"]}>
            <h1 className={styles["title-header"]}>{props.title}</h1>
            <h2 className={styles["title-path"]}><Link href="/"><a>Home</a></Link> {props.path.split("/").map((path, index) => {
                if (props.path.split("/").length-1 !== index)
                return `${path} >`
                else return ` ${path}`
            })}</h2>
        </div>
       
    </div>
  )
}