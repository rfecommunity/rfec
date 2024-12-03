import styles from './FooterStyles.module.css';

function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.logoContainer}>
                <h2 className={styles.logo}>RFEC</h2>
                <p className={styles.tagline}>Conectando Desenvolvedores</p>
            </div>
            <div className={styles.links}>
                <a href="#about" className={styles.link}>Sobre</a>
                <a href="#projects" className={styles.link}>Projetos</a>
                <a href="#community" className={styles.link}>Comunidade</a>
                <a href="#contact" className={styles.link}>Contato</a>
            </div>
            <div className={styles.socialMedia}>
                <a href="https://github.com/rfecommunity" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/recife-frontend/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    LinkedIn
                </a>
            </div>
            <div className={styles.contact}>
                <a href="mailto:recifefrontendcommunity@gmail.com" className={styles.email}>recifefrontendcommunity@gmail.com</a>
            </div>
            <div className={styles.copyright}>
                <p>&copy; 2024 Recife Front-End Community. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
