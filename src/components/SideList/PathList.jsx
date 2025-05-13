import styles from './PathList.module.css'
import OrbitRing from '../OrbitRing/OrbitRing'

export default function(props) {
    return (
        <li className={styles.pathListItem} onClick={() => props.filterPath(props.path)}>
            <div className={props.path == props.characterPath ? styles.pathActiveState : ''}>
            <OrbitRing path={props.path} characterPath={props.characterPath}/>
            <img className={styles.pathImg} alt="path_icon" src={require(`../../assets/paths/${props.path.replace(' ', '_')}_icon.png`)}/>
            </div>
            <span className={styles.pathListItemText}>{props.path}</span>
        </li> 
    )

}