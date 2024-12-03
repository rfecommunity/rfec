import styles from './GitHubStyles.module.css';
import Image from 'next/image';
import githubIcon from '../../assets/github-dark.svg';
function GitHub() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>GitHub da Comunidade</h2>
            <p className={styles.description}>
                Acesse nossos perfis no GitHub e descubra os projetos e repositórios incríveis que estamos desenvolvendo juntos!
            </p>
            <div className={styles.linksContainer}>
                <div className={styles.card}>
                    <Image src={githubIcon} alt="GitHub" className={styles.icon} />
                    <h3 className={styles.cardTitle}>Perfil Principal da Comunidade</h3>
                    <p className={styles.cardDescription}>
                        Fique por dentro de todos os projetos e iniciativas da Recife Front-End Community (RFEC)!
                    </p>
                    <a
                        href="https://github.com/rfecommunity"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Visitar Perfil
                    </a>
                </div>
                <div className={styles.card}>
                    <Image src={githubIcon} alt="GitHub" className={styles.icon} />
                    <h3 className={styles.cardTitle}>Organização da Comunidade</h3>
                    <p className={styles.cardDescription}>
                        Explore projetos colaborativos e contribua com ideias inovadoras!
                    </p>
                    <a
                        href="https://github.com/rfecommunity-organization"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Conhecer Organização
                    </a>
                </div>
            </div>
        </section>
    );
}

export default GitHub;
