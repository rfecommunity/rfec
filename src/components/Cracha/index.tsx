import styles from './CrachaStyles.module.css';
import frontBadgeImg from '../../assets/FRENTE.png';
import backBadgeImg from '../../assets/VERSO.png';
import Image from 'next/image';

function Cracha() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Crachá da Comunidade</h2>
            <p className={styles.description}>
                Veja abaixo o design do crachá que representa nossa comunidade.
            </p>
            <div className={styles.badgeContainer}>
                <div className={styles.badge}>
                    <Image
                        src={frontBadgeImg}
                        alt="Crachá - Frente"
                        className={styles.image}
                    />
                    <span className={styles.label}>Frente</span>
                </div>
                <div className={styles.badge}>
                    <Image
                        src={backBadgeImg}
                        alt="Crachá - Verso"
                        className={styles.image}
                    />
                    <span className={styles.label}>Verso</span>
                </div>
            </div>
            <a href="/downloads/cracha.pdf" download className={styles.downloadButton}>
                Baixar Crachá
            </a>
        </section>
    );
}

export default Cracha;
