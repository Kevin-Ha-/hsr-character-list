import styles from './FilterList.module.css'
import { useState } from 'react'
import FilterToggle from '../FilterToggle/FilterToggle'
import PathList from './PathList'
import ElementList from './ElementList'

export default function(props) {
    const paths = ['Destruction', 'The Hunt', 'Erudition', 'Harmony', 'Nihility', 'Preservation', 'Abundance', 'Remembrance']
    const elements = ['Fire', 'Ice', 'Lightning', 'Wind', 'Physical', 'Quantum', 'Imaginary']

    const [characterPath, setCharacterPath] = useState('All')
    const [characterElement, setCharacterElement] = useState('Fire')
    const [filterState, setFilterState] = useState('path')
    const [filterSelectAnim, setFilterSelectAnim] = useState(false)

    function filter(type, val) {
        if(val == 'All' && filterState !== 'path') {
            setFilterState('path')
        }

        if(type == 'path') {
            setCharacterPath(val)
            props.filterListCallback(type, val)
        } else {
            setCharacterElement(val)
            props.filterListCallback(type, val)
        }

        setFilterSelectAnim(true)
        setTimeout(() => {
            setFilterSelectAnim(false)
        }, 300)
    }

    function toggleFilter() {
        const val = filterState == 'path' ? 'element' : 'path'
        const currentFilterVal = val == 'path' ? characterPath : characterElement
        
        setFilterState(val)
        filter(val, currentFilterVal)
    }

    return(
        <section className={styles.filterListContainer}>
            <FilteredList 
                filterState={filterState} 
                filter={filter}
                characterPath={characterPath}
                characterElement={characterElement}
                paths={paths}
                elements={elements}
                selectAnim={filterSelectAnim}
            />
            <FilterToggle filterState={filterState} toggleFilter={toggleFilter} currentPath={characterPath} currentElement={characterElement}/>
        </section>
    )
}

function FilteredList(props) {
    return(
        <ul className={styles.filterList}>  
            <PathList 
                key={`All`} 
                path={`All`} 
                filter={props.filter}
                characterPath={props.characterPath}
                characterElement={props.characterElement}
                selectAnim={props.selectAnim}
                filterState={props.filterState}
            />

                {props.filterState === 'path' ? (
                    props.paths.map((p) => {
                        return <PathList 
                            key={p}
                            path={p}
                            filter={props.filter}
                            characterPath={props.characterPath}
                            characterElement={props.characterElement}
                            selectAnim={props.selectAnim}
                            filterState={props.filterState}
                        />
                    })
                ) : (
                    props.elements.map((e) => (
                        <ElementList
                            key={e}
                            element={e}
                            filter={props.filter}
                            characterPath={props.characterPath}
                            characterElement={props.characterElement}
                            selectAnim={props.selectAnim}
                            filterState={props.filterState}
                        />
                    ))                    
                )}
        </ul>
    )
}

