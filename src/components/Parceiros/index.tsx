import styles from './ParceirosStyles.module.css';
import Image from 'next/image';
import ivLogo from '../../assets/iv.png';
import fiapLogo from '../../assets/fiap.png';
import { useState } from 'react';

function Parceiros() {
    const partners = [
        { name: 'Comunidade IV', logo: ivLogo, link: 'https://www.iv.com.br' },
        { name: 'Faculdade FIAP', logo: fiapLogo, link: 'https://www.fiap.com.br' },
    ];

    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        setStartIndex((prev) =>
            prev + 3 >= partners.length ? 0 : prev + 3
        );
    };

    const handlePrev = () => {
        setStartIndex((prev) =>
            prev - 3 < 0 ? partners.length - (partners.length % 3 || 3) : prev - 3
        );
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Parceiros</h2>
            <p className={styles.description}>
                Conheça nossos parceiros que colaboram para o sucesso da Recife Front-End Community.
            </p>
            <div className={styles.carousel}>
                <button className={styles.navButton} onClick={handlePrev}>
                    &#10094;
                </button>
                <div className={styles.partnerGroup}>
                    {partners
                        .slice(startIndex, startIndex + 3)
                        .map((partner, index) => (
                            <a
                                key={index}
                                href={partner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.partner}
                            >
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    className={styles.logo}
                                />
                                <h3 className={styles.partnerName}>
                                    {partner.name}
                                </h3>
                            </a>
                        ))}
                </div>
                <button className={styles.navButton} onClick={handleNext}>
                    &#10095;
                </button>
            </div>
        </section>
    );
}

export default Parceiros;
