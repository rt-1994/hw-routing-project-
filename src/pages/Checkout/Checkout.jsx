import React, {useState} from 'react';
import {Button, Container} from '@mui/material';
import styles from "./Checkout.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import images from "../../assets/images";
import {InputText} from "../../components/FormComponents/InputText";
import {MultiLine} from "../../components/FormComponents/MultiLine";
import {Dropdown} from "../../components/FormComponents/Dropdown";
import {InputCheckbox} from "../../components/FormComponents/Checkbox";
import {InputRadio} from "../../components/FormComponents/Radio";


const defaultValues = {
    textValue: "",
    radioValue: "",
    checkboxValue: [],
    dateValue: new Date(),
    dropdownValue: "",
    sliderValue: 0,
};


function Checkout() {

    const [pizza, setPizza] = useState(JSON.parse(localStorage["currentPizza"]));
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        name: yup.string().required().min(2),
        method: yup.string().required()
    });

    const methods = useForm({ defaultValues });
    const { handleSubmit, reset, control, setValue, watch } = methods;
    const onSubmit = (data) => console.log(data);

    // const {control, handleSubmit, formState: {errors}, reset} = useForm({
    //     resolver: yupResolver(schema)
    // });

    // const onSubmit = (data) => {
    //     console.log(data);
    // };

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
                    <InputText name="Name" control={control} label="Name"/>
                </div>
                <div className={styles.formLine}>
                    <span>Email: </span>
                    <InputText name="Email" control={control} label="Email"/>
                </div>
                <div className={styles.formLineLeft}>
                    <span>Choose delivery method: </span>
                    <Dropdown name="Method" control={control} label="Method"/>
                </div>
                <div className={styles.formLine}>
                    <span>Additional notes: </span>
                    <MultiLine name="Message" control={control} label="Message"/>
                </div>
                <div className={styles.formLineLeft}>
                    <span>Are you a regular client: </span>
                    <InputRadio control={control} label="" name="client"/>
                </div>
                <div className={styles.formLineLeft}>
                    <span>Do you have a coupon code: </span>
                    <InputCheckbox name="Check" control={control} setValue={setValue} label=""/>
                </div>
                <div className={styles.formLine}>
                    <span>Coupon: </span>
                    <InputText name="Coupon" control={control} label="Coupon"/>
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