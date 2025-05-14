import styles from './Card.module.css'

export default function(props) {
    const rarityClassName = `${props.character.rarity === 5 ? styles.rarityFive : styles.rarityFour}`
  
    function CharacterIcons() {
        return(
            <div className={styles.iconContainer}>
                <img className={`${styles.characterElement} ${styles.characterIcon}`} src={require(`../../assets/elements/color/${props.character.element.toLowerCase()}.webp`)}/>
                <img className={`${styles.characterPath} ${styles.characterIcon}`} src={require(`../../assets/paths/${props.character.character_path.replace(' ', '_')}_icon.png`)}/>
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
                            <img key={key} className={styles.characterRarityIcon} src={require(`../../assets/rarity_5.png`)}/>
                        )}
                    </div>
                    <div className={styles.characterFooterFade}></div>
                </footer>
            </>
        )
    }

    const owned = props.character.owned
    const newCharacter = props.character.new

    const notOwnedClass = !owned ? styles.notOwned : ''

    return(
        <section className={styles.cardContainer}>
            <article className={`${styles.cardContainerPortrait} ${rarityClassName} ${notOwnedClass}`}>
                <CharacterIcons />
                <img className={styles.characterPortrait} src={require(`../../assets/characters/${props.character.name.replaceAll(' ', '_')}_portrait.png`)}/>
                {!owned ? <div className={styles.notIndexed}>Not Indexed</div> : ''}
                <CharacterFooterInfo />
            </article>   
        </section>
    )
}
