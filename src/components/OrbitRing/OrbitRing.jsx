import styles from './OrbitRing.module.css'

export default function(props) {
    const DOT_COUNT = 45

    if(props.characterPath == props.path) {
        return(
            <>
                <div className={styles.dotRing}>
                    {[...Array(DOT_COUNT).keys()].map(key => {
                            let largeDotClassName = (key === 0 || key === 24) ? `${styles.largeDot}` : ''

                        return <span className={`${styles.dot} ${largeDotClassName}`} style={{ '--i': key }} key={key}></span>
                        }
                    )}
                </div>
            </>
        )
    }
}