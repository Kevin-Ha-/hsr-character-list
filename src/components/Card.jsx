import styles from './Card.module.css'

export default function(props) {
    const rarityClassName = `${props.character.rarity === 5 ? styles.rarityFive : styles.rarityFour}`
  
    function CharacterIcons() {
        return(
            <div className={styles.iconContainer}>
                <img className={`${styles.characterElement} ${styles.characterIcon}`} src={require(`../images/elements/color/${props.character.element.toLowerCase()}.webp`)}/>
                <img className={`${styles.characterPath} ${styles.characterIcon}`} src={require(`../images/paths/${props.character.character_path.replace(' ', '_')}_icon.png`)}/>
            </div>
        )
    }

    function CharacterFooterInfo() {
        return(
            <>
                <footer className={`${styles.characterFooterContainer} ${rarityClassName}`}>
                    <div className={styles.characterCardContent}>{props.character.name}</div>
                    <div className={styles.rarityIconContainer}>
                        {[...Array(props.character.rarity).keys()].map(key =>
                            <img key={key} className={styles.characterRarityIcon} src={require(`../images/rarity_5.png`)}/>
                        )}
                        
                    </div>
                    <div className={styles.characterFooterFade}></div>
                </footer>
            </>
        )
    }

    return(
        <section className={styles.cardContainer}>
            <article className={`${styles.cardContainerPortrait} ${rarityClassName}`}>
                <CharacterIcons />
                <img className={styles.characterPortrait} src={require(`../images/characters/${props.character.name.replaceAll(' ', '_')}_portrait.png`)}/>
                <CharacterFooterInfo />
            </article>   
        </section>
    )
}
