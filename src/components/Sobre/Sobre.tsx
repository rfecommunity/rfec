// src/components/sessoes/Sobre.tsx
import styles from './AboutStyles.module.css';
import profileImg from '../../assets/rfec-recife.jpg'; // Substitua pela logo da comunidade
import Image from 'next/image';

function About() {
    return (
        <section id="about" className={styles.container}>
            <h1 className={styles.sectionTitle}>Sobre a RFEC</h1>
            <div className={styles.aboutContainer}>
                <Image
                    src={profileImg}
                    alt="Logo da RFEC"
                    width={600}
                    height={600}
                    className={styles.profileImg}
                />
                <div className={styles.aboutText}>
                    <p>
                        Olá, somos a Recife Front-End Community (RFEC)! 🌟 A RFEC foi criada para conectar e apoiar
                        desenvolvedores front-end (e também full-stack e back-end) da nossa cidade. Aqui, buscamos crescer
                        juntos, compartilhar conhecimentos e contribuir com o desenvolvimento de projetos incríveis.
                    </p>
                    <p>
                        Nossa missão é promover a troca de experiências, organizar eventos e criar oportunidades para que
                        todos os nossos membros possam se conectar, aprender e se destacar no mundo da tecnologia.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default About;
