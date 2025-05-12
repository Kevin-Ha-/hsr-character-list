import React from 'react';
import Card from './components/Card'
import PathList from './components/PathList'
import NavBar from './components/NavBar';
import characterData from './data.json'
import styles from './App.module.css'
import { useState } from 'react'
    
function App() {
  const [filteredCharacters, setFilteredCharacters] = useState(characterData)

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
            <PathList pathListCallback={filterByPath}/>
            <section className={styles.cardContainer}>
              <section className={styles.cardInnerContainer}>
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