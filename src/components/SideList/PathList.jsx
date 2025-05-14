import styles from './PathList.module.css'
import OrbitRing from '../OrbitRing/OrbitRing'

export default function(props) {
    return (
        <li className={styles.pathListItem} onClick={() => props.filter('path', props.path)}>
            <div className={props.path == props.characterPath && props.filterState == 'path' ? styles.pathActiveState : ''}>
            <OrbitRing path={props.path} characterPath={props.characterPath} characterElement={props.characterElement} element={props.element} filterState={props.filterState}/>
            <img className={styles.pathImg} alt="path_icon" src={require(`../../assets/paths/${props.path.replace(' ', '_')}_icon.png`)}/>
            </div>
            <span className={`${styles.pathListItemText} ${props.selectAnim && props.filterState == `path` && props.path == props.characterPath ? styles.pathUnderlineAnim : ''}`}>{props.path}</span>
        </li> 
    )

}