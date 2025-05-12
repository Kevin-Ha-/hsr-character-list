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
                <div className={styles.indexContainer}>
                    <p className={styles.indexText}>Indexed</p><span className={styles.indexValue}>5/5</span>
                </div>
                <img className={styles.return} src={require(`../images/return_button.png`)}/>
            </section>
        </header>
    )
}