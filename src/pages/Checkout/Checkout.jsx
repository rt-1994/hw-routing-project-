import React, {useState} from 'react';
import {Button, Checkbox, Container, FormHelperText} from '@mui/material';
import styles from "./Checkout.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import images from "../../assets/images";
import {InputText} from "../../components/FormComponents/InputText";
import {MultiLine} from "../../components/FormComponents/MultiLine";
import {Dropdown} from "../../components/FormComponents/Dropdown";
import {InputRadio} from "../../components/FormComponents/Radio";

function Checkout() {

    const [coupon, setCoupon] = useState(false);

    const [pizza, setPizza] = useState(JSON.parse(localStorage["currentPizza"]));
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        name: yup.string().required().min(2),
        coupon: coupon ? yup.string().required(): "",
        method: yup.string().required('Please select an option'),
    });

    const methods = useForm({resolver: yupResolver(schema)});
    const {handleSubmit, reset, control, setValue, watch, formState: {errors}} = methods;
    const onSubmit = (data) => alert("Submited");

    const onReset = () => {
        reset()
    }

    return (
        <Container maxWidth="sm">
            <h2>Ingredient info:</h2>
            <div className={styles.ingredients}>
                {pizza.filter((item) =>
                    item.count > 0).map((element) =>
                    <div key={element.key}>
                        <h3>{element.name}</h3>
                        <img src={images[element.img]} alt=""/>
                        <p>{element.count}</p>
                    </div>)
                }
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.checkoutForm}>
                <h2>Checkout info:</h2>
                <div className={styles.formLine}>
                    <span>Name: </span>
                    <InputText key="name" name="name" control={control} label="Name" status={true}/>
                </div>
                <div className={styles.formLine}>
                    <span>Email: </span>
                    <InputText key="email" name="email" control={control} label="Email" status={true}/>
                </div>
                <div className={styles.formLineLeft}>
                    <span>Choose delivery method: </span>
                    <Dropdown name="method" control={control} label="Method"/>
                    {errors.method && <FormHelperText error>{errors.method.message}</FormHelperText>}
                </div>
                <div className={styles.formLine}>
                    <span>Additional notes: </span>
                    <MultiLine name="message" control={control} label="Message"/>
                </div>
                <div className={styles.formLineLeft}>
                    <span>Are you a regular client: </span>
                    <InputRadio control={control} label="Yes" value="Yes" checked name="client"/>
                    <InputRadio control={control} label="No" value="No" name="client"/>
                </div>
                <div className={styles.formLineLeft}>
                    <span>Do you have a coupon code: </span>
                    <Checkbox onChange={() => setCoupon(!coupon)}/>
                </div>

                <div className={styles.formLine}>
                    <span>Coupon: </span>
                    <InputText key="coupon" name="coupon" control={control} label="Coupon" status={coupon}/>
                </div>
                <div className={styles.buttons}>
                    <Button onClick={onReset} variant="contained" color="primary">Reset</Button>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </div>
            </form>
        </Container>
    );
}

export default Checkout;