import { useState, useEffect } from "react";
import Link from 'next/link'
//Style Import
import styles from '../../styles/modules/navbar.module.scss'

export default function Navbar({page}){
    // console.log(page);
    const [state, setState] = useState({prevScrollpos:20, visible:true})
    useEffect( () => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
     }, []);
  

    function handleScroll(){
        const { prevScrollpos } = state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;
        setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    }


    return (
        <nav className={`${styles.navbar} ${state.visible ? null: styles["navbar--hidden"]}`}>
          <div className={styles.header}>
              SmartWatt
          </div>
          <div className={styles["nav-items-container"]}>
            <Link href="/"><a className={`${styles["nav-item"]} ${page === "/" ? styles["active"] : null}`}>Home</a></Link>
            <Link href="/about"><a className={`${styles["nav-item"]} ${page.includes("about") ? styles["active"] : null}`}>About</a></Link>
            <Link href="/"><a className={`${styles["nav-item"]} ${page.includes("portfolio") ? styles["active"] : null}`}>Portfolio</a></Link>
            <Link href="/"><a className={`${styles["nav-item"]} ${page.includes("contact") ? styles["active"] : null}`} >Contact</a></Link>
          </div>
        </nav>
    );
  
}