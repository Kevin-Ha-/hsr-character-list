import React from 'react';
import Card from './components/Card'
import PathList from './components/PathList'
import characterData from './data.json'
import styles from './App.module.css'
    
function App() {
  
  const characterCards = characterData.map((character) => {
    return (
      <Card
        element={character.element}
        rarity={character.rarity}
        name={character.name}
        src={require(`./images/characters/${character.name.replaceAll(' ', '_')}_portrait.png`)}
      />
    )
  })

  return (
    <main className={styles.mainContainer}>      
    
      <PathList/>
      <section className={styles.cardContainer}>
        {characterCards}
      </section>
    </main>
  );
}

export default App;