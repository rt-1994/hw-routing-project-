import React from 'react';
import styles from "../Counter/Counter.scss";

function SettingItem(props) {

    return (
        <div className={styles.counterInfo}>
            <h4 className={styles.name}>{props.name}</h4>
            <p className={styles.price}>{props.price} $</p>
        </div>
    );
}

export default SettingItem;