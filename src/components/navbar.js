import { useState, useEffect } from "react";

//Style Import
import styles from '../../styles/modules/navbar.module.scss'

export default function Navbar({page}){
    // console.log(page);
    var prevScrollpos = 20;
    if(typeof window === undefined){
        prevScrollpos = window.pageYOffset;
    }

    const [state, setState] = useState({prevScrollpos:prevScrollpos, visible:true})
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
            <a href="/" className={`${styles["nav-item"]} ${page === "/" ? styles["active"] : null}`} >Home</a>
            <a href="/" className={`${styles["nav-item"]} ${page.includes("about") ? styles["active"] : null}`} >About</a>
            <a href="/" className={`${styles["nav-item"]} ${page.includes("portfolio") ? styles["active"] : null}`} >Portfolio</a>
            <a href="/" className={`${styles["nav-item"]} ${page.includes("contact") ? styles["active"] : null}`}>Contact</a>
          </div>
        </nav>
    );
  
}