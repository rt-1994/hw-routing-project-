import React, {useReducer, useRef, useState} from "react";
import {Link} from "react-router-dom";
import styles from "./Main.scss";
import images from "../../assets/images";
import Button from '@mui/material/Button';
import PizzaItem from "../../components/PizzaItem/PizzaItem";
import Counter from "../../components/Counter/Counter";
import SettingsItem from "../../components/SettingItem/SettingItem";
import reducer from "./reducer";
import data from "../data";
import {useForm} from "react-hook-form";
import ModalComponent from "../../components/Modal/ModalComponent";

export default function Main() {
    const {register, handleSubmit, getValues, reset} = useForm();
    const [pizzaData, dispatch] = useReducer(reducer, data)
    const [modalCheckout, setModalCheckout] = useState(false);
    const [token, setToken] = useState("");
    const [modalLoad, setModalLoad] = useState(false);
    const tokenInput = useRef(null)
    const message = useRef(null)
    const onChange = () => {
        dispatch({type: "addIngredient", ingredients: getValues()})
        dispatch({type: "price", ingredients: getValues()})
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

    const savePizza = () => {
        let data = "ABCDEFGHIJKLMNOPQRSTUVWXYXabefghijklmnopqrstuvwxyz0123456789$@-"
        let token = ""
        for (let i = 1; i <= 10; i++) {
            token += data[Math.floor(Math.random() * 63)];
        }
        if (localStorage["pizza"]) {
            let data = JSON.parse(localStorage["pizza"]);
            data.push({key: token, pizza: getValues()});
            localStorage.setItem("pizza", JSON.stringify(data));
        } else {
            localStorage.setItem("pizza", JSON.stringify([{key: token, pizza: getValues()}]));
        }
        showMessage()
        setToken(token)
        reset()
        dispatch({type: "reset"})
    }

    const showMessage = () => {
        message.current.style.display = "flex"
        setTimeout(() => {
            message.current.style.display = "none"
        }, 20000)
    }

    const loadPizza = () => {
        reset()
        dispatch({type: "reset"})
        let data = JSON.parse(localStorage["pizza"]);
        const info = data.find((item) => item.key === tokenInput.current.value);
        dispatch({type: "addIngredient", ingredients: info.pizza});
        dispatch({type: "price", ingredients: info.pizza});
        setModalLoad(false);
    }
    const selectedIngredients = () => {
        pizzaData.ingredients.map((item) => item.count = getValues()[item.key]);
        localStorage.setItem("currentPizza", JSON.stringify(pizzaData.ingredients));
        return pizzaData.ingredients
    }

    const copyText = (event)=>{
        event.preventDefault();
        navigator.clipboard.writeText(event.target.innerText);
        alert("Token copied to clipboard")
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.leftBar}>
                <div className={styles.leftBarHeader}>
                    <h3>Your pizza:</h3>
                </div>
                <div className={styles.leftBarContent}>
                    <PizzaItem
                        image={images.testa}
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

                <form onSubmit={handleSubmit()} className={styles.rightBarContent}>
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
                                defaultValue={pizzaData.pizza.ingredients[item.key]}
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
                        <Button
                            disabled={pizzaData.price === 0 ? true : false}
                            onClick={savePizza}
                            variant="contained">
                            Save Pizza
                        </Button>

                        <Button
                            disabled={pizzaData.price === 0 ? true : false}
                            onClick={() => setModalCheckout(true)}
                            variant="contained"
                            type="submit">
                            Checkout
                        </Button>

                    </div>

                    <div className={styles.load}>
                        <Button
                            onClick={() => setModalLoad(true)}
                            variant="contained">
                            Load Pizza
                        </Button>

                    </div>
                </form>
                <div ref={message}  className={styles.message}>
                    <p>Your pizza configuration has been saved.</p>
                    <p><span>Your number is: </span><span className={styles.token} onClick={()=>copyText(event)}>{token}</span></p>
                </div>


            </div>

            <ModalComponent
                isOpen={modalCheckout}
                className={styles.modalLoad}
                overlayClassName={styles.modalOverlayLoad}
            >
                <div className={styles.checkoutModalContent}>
                    <h2>Your Order</h2>
                    <p>The pizza has the following ingredients:</p>
                    <ul>
                        {selectedIngredients().filter((item) => item.count > 0).map((element) => <li
                            key={element.key}>{element.name}: {element.count}</li>)}
                    </ul>
                    <h3>Total price: {pizzaData.price} $</h3>
                    <div className={styles.modalButtons}>
                        <Button variant="contained" onClick={() => setModalCheckout(false)}>Cancel</Button>
                        <Link to={'/checkout'}>
                            <Button variant="contained" onClick={() => setModalCheckout(false)}>Continue</Button>
                        </Link>
                    </div>

                </div>
            </ModalComponent>

            <ModalComponent
                isOpen={modalLoad}
                className={styles.modalLoad}
                overlayClassName={styles.modalOverlayLoad}
            >
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={() => setModalLoad(false)}>x</span>
                    <p>Load pizza using a configuration number: </p>
                    <div className={styles.modalInput}>
                        <input ref={tokenInput} type="text"/>
                        <Button variant="contained" onClick={loadPizza}>Submit</Button>
                    </div>
                </div>
            </ModalComponent>

        </div>
    )
}
