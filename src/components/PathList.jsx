import styles from './PathList.module.css'
import { useState } from 'react'
import FilterToggle from './FilterToggle'

export default function(props) {
    const paths = ['Destruction', 'The Hunt', 'Erudition', 'Harmony', 'Nihility', 'Preservation', 'Abundance', 'Remembrance']

    const [characterPath, setCharacterPath] = useState('All')
    const [filterState, setFilterState] = useState('path')

    // const [characterElement, setCharacterElement] = useState('fire')

    function filterPath(path) {
        setCharacterPath(path)
        props.pathListCallback(path)
    }

    function toggleFilter() {
        const val = filterState == 'path' ? 'element' : 'path'
        setFilterState(val)
    }

    return(
        <section className={styles.pathListContainer}>
            <FilterList 
                filterState={filterState} 
                filterPath={filterPath}
                characterPath={characterPath}
                paths={paths}
            />
            <FilterToggle filterState={filterState} toggleFilter={toggleFilter} currentPath={characterPath}/>
        </section>
    )
}

function FilterList(props) {
    if(props.filterState == 'path') {
        return(
            <ul className={styles.pathList}>  
                <PathRow key={`All`} path={`All`} filterPath={props.filterPath} characterPath={props.characterPath}/>
                {props.paths.map((p) => {
                    return <PathRow key={p} path={p} filterPath={props.filterPath} characterPath={props.characterPath}/>
                })}
            </ul>
        )
    } else {
        // return elements
    }
}


// function PathRow(props) {
function PathRow({path, filterPath, characterPath}) {
    return (
        <li className={styles.pathListItem} onClick={() => filterPath(path)}>
            <div className={path == characterPath ? styles.pathActiveState : ''}>
            <OrbitRing path={path} characterPath={characterPath}/>
            <img className={styles.pathImg} alt="path_icon" src={require(`../images/paths/${path.replace(' ', '_')}_icon.png`)}/>
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