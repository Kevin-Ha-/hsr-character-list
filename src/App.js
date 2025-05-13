import React from 'react';
import Card from './components/Card/Card'
import FilterList from './components/SideList/FilterList'
import NavBar from './components/NavBar/NavBar'
import characterData from './data/data.json'
import styles from './App.module.css'
import { useState, useEffect } from 'react'
    
function App() {
  const [filteredCharacters, setFilteredCharacters] = useState(characterData)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
      setShouldAnimate(true)
      const timeout = setTimeout(() => {
        setShouldAnimate(false)
      }, 1000)
      return() => clearTimeout(timeout)
  }, [filteredCharacters])


  const characterCards = filteredCharacters.map((character) => {
    return (
      <Card
        key={character.name}
        character={character}
      />
    )
  })


  const filterByPath = (pathVal) => {
    const filtered = pathVal === 'All' ? characterData : characterData.filter(val => val.character_path === pathVal)
    setFilteredCharacters(filtered)
  }

  return (
    <>
      <main className={styles.mainContainer}>      
          <NavBar />
          <section className={styles.contentContainer}>
            <FilterList pathListCallback={filterByPath}/>
            <section className={styles.cardContainer}>
              <section className={`${styles.cardInnerContainer} ${shouldAnimate ? styles.fadeCards : ''}`}>
                {characterCards}
              </section>
            </section>
          </section>
      </main>
      <section className={styles.mainContainerFrame}></section>
    </>
  );
}

export default App;