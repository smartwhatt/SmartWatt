import { useState, useEffect } from "react";
import Link from 'next/link'
//Style Import
import styles from '../../styles/modules/navbar.module.scss'

// Icon import
import { AiFillHome, AiFillInfoCircle, AiFillFolderOpen } from "react-icons/ai";
import { RiContactsBook2Fill } from "react-icons/ri";

export default function Navbar({page}){
    // console.log(page);
    const [state, setState] = useState({prevScrollpos:20, visible:true})
    useEffect( () => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
     }, [handleScroll]);
  

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
          <Link href="/"><a><div className={styles.header}>
              SmartWatt
          </div></a></Link>
          <div className={styles["nav-items-container"]}>
            <Link href="/"><a className={`${styles["nav-item"]} ${page === "/" ? styles["active"] : null}`}><AiFillHome className={styles["icon"]} /> <span>Home</span></a></Link>
            <Link href="/about"><a className={`${styles["nav-item"]} ${page.includes("about") ? styles["active"] : null}`}><AiFillInfoCircle className={styles["icon"]} /> <span>About</span></a></Link>
            <Link href="/portfolio"><a className={`${styles["nav-item"]} ${page.includes("portfolio") ? styles["active"] : null}`}><AiFillFolderOpen className={styles["icon"]} /> <span>Portfolio</span></a></Link>
            <Link href="/contact"><a className={`${styles["nav-item"]} ${page.includes("contact") ? styles["active"] : null}`} ><RiContactsBook2Fill className={styles["icon"]} /> <span>Contact</span></a></Link>
          </div>
        </nav>
    );
  
}