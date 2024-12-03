import styles from './HeroStyles.module.css';
import heroImg from '../../assets/rfec.jpg';
import Image from 'next/image';

function HeroRFEC() {
    return (
        <section id="hero" className={styles.container}>
            <div className={styles.content}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>Recife Front-End Community</h1>
                    <h2 className={styles.subtitle}>Conectando Desenvolvedores</h2>
                    <p className={styles.description}>
                        Somos uma comunidade que promove aprendizado, networking e troca de experiências para desenvolvedores front-end e entusiastas de tecnologia.
                    </p>
                    <a href="#about" className={styles.actionButton}>
                        Saiba Mais
                    </a>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src={heroImg}
                        alt="Logo da RFEC"
                        className={styles.hero}
                        width={200}
                        height={200}
                    />
                </div>
            </div>
        </section>
    );
}

export default HeroRFEC;
