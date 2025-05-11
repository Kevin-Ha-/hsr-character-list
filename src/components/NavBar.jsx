import styles from './NavBar.module.css'

export default function() {
    return(
        <header className={styles.headerInfo}>
            <img className={styles.logo} src={require(`../images/logo.gif`)}/>
            <section className={styles.navHeaderInfo}>
                <img className={styles.dataBankIcon} src={require(`../images/dataBank.png`)}/>
                <div className={styles.dataBankTextContainer}>
                    <p className={styles.dataBankText}>Data Bank</p>
                    <p style={{color: 'white', fontSize: '1.3em', margin: '0', fontWeight: 'bold'}}>Characters</p>
                </div>
            </section>
            <section className={styles.navRightInfo}>
                <p>Indexed</p>
            </section>
        </header>
    )
}