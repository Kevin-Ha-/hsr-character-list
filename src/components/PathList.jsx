import styles from './PathList.module.css'
import { useState } from 'react'

export default function() {
    const paths = ['Destruction', 'The Hunt', 'Erudition', 'Harmony', 'Nihility', 'Preservation', 'Abundance', 'Remembrance']
    return(
        <section className={styles.pathListContainer}>
            <ul className={styles.pathList}>  
                {paths.map((p) => {
                    return <PathRow key={p} path={p} />
                })}
            </ul>
        </section>
    )
}


function PathRow({path}) {
    return (
        <li className={styles.pathListItem} onClick={() => filterPath(path)}>
            <div className={styles.pathActiveState}></div>
            <img src={require(`../images/paths/${path.replace(' ', '_')}_icon.png`)}/>
            <span className={styles.pathListItemText}>{path}</span>
        </li> 
    )
}

function filterPath(path) {
    
}