import styles from './FilterToggle.module.css'
import { useState } from 'react'

function FilterToggle(props) {

    return(
        <>
          <section className={styles.filterToggleContainer}>
                <input type="checkbox" id="toggle-visible" onClick={() => props.toggleFilter()}/>
                <label htmlFor="toggle-visible" className={styles.filterToggleLabel}>
                    <div className={styles.filterToggleButton}></div>
                    <img src={require(`../../assets/paths/${props.currentPath.replace(' ', '_')}_icon.png`)} alt="Path Icon"/>
                    <img src={require(`../../assets/elements/noColor/${props.currentElement.toLowerCase()}.png`)} alt="Element Icon"/>
                </label>
            </section>
        </>
    )
}


export default FilterToggle