import React, {useEffect, useReducer} from "react";
import styles from "./Main.scss";
import images from "../../assets/images";
import testa from "../../assets/images/Testa.jpg";
import Button from '@mui/material/Button';
import PizzaItem from "../../components/PizzaItem/PizzaItem";
import {Link} from "react-router-dom";
import defaultStyles from "../../styles.scss";
import Counter from "../../components/Counter/Counter";
import SettingsItem from "../../components/SettingItem/SettingItem";
import reducer from "./reducer";
import data from "../data";
import {useForm} from "react-hook-form";


export default function Main() {
    const {register, handleSubmit, getValues, reset} = useForm();
    const [pizzaData, dispatch] = useReducer(reducer, data)
    const onSubmit = data => console.log(data);
    const onChange = () => {
        const ingredients = getValues();
        dispatch({type: "addIngredient", ingredients})
        dispatch({type: "price", ingredients})
    }
    const onReset = () => {
        reset()
        dispatch({type: "reset"})
    }

    const getData = () => {
        const data = []
        let pd = pizzaData.pizza.ingredients
        Object.keys(pd).map((key) => {
            if (pd[key] > 0) {
                const ing = pizzaData.ingredients.find((item) => item.key === key)
                data.push(ing)
            }
        })
        return data
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.leftBar}>
                <div className={styles.leftBarHeader}>
                    <h3>Your pizza:</h3>
                </div>
                <div className={styles.leftBarContent}>
                    <PizzaItem
                        image={testa}
                    />
                    {
                        getData().map((item) => {
                            return <PizzaItem
                                key={item.id}
                                image={images[item.img]}
                            />
                        })
                    }
                </div>
            </div>
            <div className={styles.rightBar}>
                <div className={styles.rightBarHeader}>
                    <h3>Your pizza</h3>
                    <span className={styles.price}>{pizzaData.price || 0} $</span>
                    <Button onClick={onReset} variant="contained">Reset pizza</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.rightBarContent}>
                    {pizzaData.ingredients.map((item) => (
                        <div className={styles.counter} key={item.id}>
                            <SettingsItem
                                name={item.name}
                                price={item.price}
                            />
                            <Counter
                                name={item.key}
                                register={register}
                                onChange={onChange}
                            />
                        </div>
                    ))}

                    <div className={styles.total}>
                        <h4>Total:</h4>
                        <p className={styles.totalPrice}>
                            {pizzaData.price || 0} $
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <Button variant="contained">Save Pizza</Button>
                        <Button variant="contained" type="submit">Checkout</Button>
                    </div>

                    <div className={styles.load}>
                        <Button variant="contained">Load Pizza</Button>

                    </div>
                </form>
                <p></p>
            </div>
        </div>
    )
}
