// import './Card.css'
import styles from './Card.module.css'

export default function(props) {
    return(
        <section className={styles.cardContainer}>
            <article className={styles.cardContainerPortrait}>
                <img src={props.src}/>
                <div className={styles.characterCardContent}>{props.name}</div>
                
            </article>   
        </section>
    )
}
