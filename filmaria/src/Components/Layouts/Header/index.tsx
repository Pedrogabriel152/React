import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

// CSS
import styles from './Header.module.css';

const Header = () => {
    return (
        <header>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>Prime Flix</Link>
            </nav>
        </header>
    );
}

export default Header;