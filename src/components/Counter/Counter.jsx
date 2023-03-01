import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from "./Counter.scss";
import Button from '@mui/material/Button';
import {v4 as uuid} from 'uuid';

function Counter({register, name, onChange, defaultValue}) {
    const inputId = useMemo(()=> uuid(), [])
    const inputRef = register(name, { required: true,
        onChange: onChange
    })

    const inc = () => {
        const input = document.getElementById(inputId);
        input.stepUp();
        input.dispatchEvent(new Event('change', {bubbles: true}))
    }

    const dec = () => {
        const input = document.getElementById(inputId);
        input.stepDown();
        input.dispatchEvent(new Event('change', {bubbles: true}))
    }

    return (
        <div className={styles.counterChange}>
            <Button onClick={dec} className={styles.dec} variant="contained">-</Button>
            <input
                {...inputRef}
                id={inputId}
                type="number"
                max={10}
                min={0}
                step={1}
                defaultValue={defaultValue}
                readOnly={true}
            />
            <Button onClick={inc} className={styles.inc} variant="contained">+</Button>
        </div>
    );
}

export default Counter;