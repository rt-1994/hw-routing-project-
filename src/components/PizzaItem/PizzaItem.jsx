import React from 'react';
import styles from "../../pages/Main/Main.scss";

function PizzaItem(props) {
    return (
        <div className={styles.pizzaItem}>
            <img src={props.image} alt=""/>
        </div>
    );
}

export default PizzaItem;