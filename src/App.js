import React from 'react';
import Card from './components/Card'
import PathList from './components/PathList'
import NavBar from './components/NavBar';
import characterData from './data.json'
import styles from './App.module.css'
    
function App() {
  
  const characterCards = characterData.map((character) => {
    return (
      <Card
        key={character.name}
        character={character}
      />
    )
  })

  return (
    <>
      <main className={styles.mainContainer}>      
          <NavBar />
          <section className={styles.contentContainer}>
            <PathList/>
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