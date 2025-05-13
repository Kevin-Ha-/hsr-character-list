import styles from '../components/FilterList.module.css'
import { useState } from 'react'
import FilterToggle from './FilterToggle'
import PathList from './PathList'

export default function(props) {
    const paths = ['Destruction', 'The Hunt', 'Erudition', 'Harmony', 'Nihility', 'Preservation', 'Abundance', 'Remembrance']
    // const elements = ['Fire', 'Ice']

    const [characterPath, setCharacterPath] = useState('All')
    const [filterState, setFilterState] = useState('path')

    function filterPath(path) {
        setCharacterPath(path)
        props.pathListCallback(path)
    }

    function toggleFilter() {
        const val = filterState == 'path' ? 'element' : 'path'
        setFilterState(val)
    }

    return(
        <section className={styles.filterListContainer}>
            <FilteredList 
                filterState={filterState} 
                filterPath={filterPath}
                characterPath={characterPath}
                paths={paths}
            />
            <FilterToggle filterState={filterState} toggleFilter={toggleFilter} currentPath={characterPath}/>
        </section>
    )
}

function FilteredList(props) {
    if(props.filterState == 'path') {
        return(
            <ul className={styles.filterList}>  
                <PathList key={`All`} path={`All`} filterPath={props.filterPath} characterPath={props.characterPath}/>
                {props.paths.map((p) => {
                    return <PathList key={p} path={p} filterPath={props.filterPath} characterPath={props.characterPath}/>
                })}
            </ul>
        )
    } else {
        // return elements
    }
}

