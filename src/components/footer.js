import styles from '../../styles/modules/footer.module.scss'


export default function Footer() {
  return (
    <footer className={styles["footer-container"]} >
        <span className={styles["copyright"]}>&copy;Smart Wattanapornmongkol</span>
    </footer>
  )
}