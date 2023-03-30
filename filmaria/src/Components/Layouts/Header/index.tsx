import React, { ReactNode } from "react";

// CSS
import styles from './Header.module.css';

const Header = () => {
    return (
        <header>
            <nav className={styles.navbar}>
                <a href="/" className={styles.logo}>Prime Flix</a>
                <a href="/my-filmes" className={styles.menu}>Meus filmes</a>
            </nav>
        </header>
    );
}

export default Header;