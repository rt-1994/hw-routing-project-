import React from 'react';
import {Link} from "react-router-dom";
import styles from "./Nav.scss";

function Nav(props) {
    return (
        <div className={styles.nav}>
            <ul>
                <li className={styles.linkItem}>
                    <Link to={'/'}>Pizza builder</Link>
                </li>
                <li className={styles.linkItem}>
                    <Link to={'/'}>Ingredients</Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav;