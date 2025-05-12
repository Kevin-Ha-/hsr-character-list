import styles from './PathList.module.css'
import { useState } from 'react'

export default function() {
    const paths = ['Destruction', 'The Hunt', 'Erudition', 'Harmony', 'Nihility', 'Preservation', 'Abundance', 'Remembrance']

    const [characterPath, setCharacterPath] = useState(paths[0])

    function filterPath(path) {
        setCharacterPath(path)
    }

    return(
        <section className={styles.pathListContainer}>
            <ul className={styles.pathList}>  
                {paths.map((p) => {
                    return <PathRow key={p} path={p} filterPath={filterPath} characterPath={characterPath}/>
                })}
            </ul>
        </section>
    )
}


// function PathRow(props) {
function PathRow({path, filterPath, characterPath}) {
    return (
        <li className={styles.pathListItem} onClick={() => filterPath(path)}>
            <div className={path == characterPath ? styles.pathActiveState : ''}>
            <OrbitRing path={path} characterPath={characterPath}/>
            <img className={styles.pathImg} src={require(`../images/paths/${path.replace(' ', '_')}_icon.png`)}/>
            </div>
            <span className={styles.pathListItemText}>{path}</span>
        </li> 
    )
}

function OrbitRing(props) {
    const amountOfDots = 45

    if(props.characterPath == props.path) {
        return(
            <>
            <div className={styles.dotRing}>
                {[...Array(amountOfDots).keys()].map(key => {
                        let largeDotClassName = (key === 0 || key === 24) ? `${styles.largeDot}` : ''

                    return <span className={`${styles.dot} ${largeDotClassName}`} style={{ '--i': key }} key={key}></span>
                    }
                )}
            </div>
            </>
        )
    }
}