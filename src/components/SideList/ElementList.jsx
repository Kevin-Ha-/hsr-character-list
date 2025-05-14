import styles from './ElementList.module.css'
import OrbitRing from '../OrbitRing/OrbitRing'

export default function(props) {
    let extension
    let type

    props.characterElement == props.element ? (extension = `webp`, type = `color`) : (extension = `png`, type = `noColor`)
    
    return(
        <li className={styles.elementListItem} onClick={() => props.filter('element', props.element)}>
            <div className={props.element == props.characterElement ? styles.elementActiveState : ''}>
            <OrbitRing element={props.element} characterElement={props.characterElement} characterPath={props.characterPath} path={props.path} filterState={props.filterState}/>     
            <img className={styles.elementImg} alt="path_icon" src={require(`../../assets/elements/${type}/${props.element.toLowerCase()}.${extension}`)}/>
            </div>
            <span className={`${styles.elementListItemText} ${props.selectAnim && props.element == props.characterElement ? styles.elementUnderlineAnim : ''}`}>{props.element}</span>
        </li> 
    )
}