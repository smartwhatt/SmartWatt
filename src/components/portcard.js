import styles from '../../styles/modules/portcard.module.scss'
// import Image from 'next/image'
import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react';
import firebase from "../libs/clientApp"
import { useDownloadURL } from 'react-firebase-hooks/storage';

export default function Portcard(props) {

  const [state, setState] = useState({work:props.item, rendering:true, color:null})
  if (props.item.preview !== undefined || props.item.preview !== null){
    var [downloadUrl, loading, error] = useDownloadURL(firebase.storage().ref(props.item.preview));
  }


  if (!loading && downloadUrl && state.rendering){
    setState({...state, work:{...state.work, preview:downloadUrl}, rendering:false});
  }

  if (props.textOnly){
    if(props.item.type === "Project")
      return (
        <div className={styles["no-text-container"]}>
            <h3 className={styles["card-title"]}><Link href={`project/${props.item.title}`} >{state.work.title}</Link></h3>
            {props.item.des !== undefined ? <div><span>Description: </span><p>{props.item.des}</p></div> : null}
            <div className={styles["card-github"]}>Github: {state.work.github}</div>
        </div>
      )
  }

  if (props.item.link !== undefined)
  return (
    <Link href={props.item.link} >
        <a target={"_blank"} title={state.work.title}>
            <div className={styles["card-container"]} style={!loading ? {backgroundImage: `url(${state.work.preview})`}: null}>
                <span className={styles["card-title"]}>{state.work.title}</span>
                <span className={styles["card-badge"]}>{state.work.type}</span>
            </div>
        </a>
    </Link>
  )
  else if (props.item.type === "Project")
  return (
    <Link href={`project/${props.item.title}`} >
        <a title={state.work.title}>
            <div className={styles["card-container"]} style={!loading ? {backgroundImage: `url(${state.work.preview})`}: null}>
                <span className={styles["card-title"]}>{state.work.title}</span>
                <span className={styles["card-badge"]}>{state.work.type}</span>
            </div>
        </a>
    </Link>
  )
  else
  return (
    <div className={styles["card-container"]} style={!loading ? {backgroundImage: `url(${state.work.preview})`}: null}>
        <span className={styles["card-title"]}>{state.work.title}</span>
        <span className={styles["card-badge"]}>{state.work.type}</span>
        {/* {console.log(state.work)} */}
        {/* {!loading ? <Image src={state.skill.src} alt={state.skill.name} width={75} height={75} /> : null} */}
    </div>
  )
}