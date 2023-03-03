import React from "react";
import {FormControl, FormControlLabel, FormLabel} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller } from "react-hook-form";

const options = [
    {
        label: "Yes",
        value: "1",
    },
    {
        label: "No",
        value: "2",
    },
];

export const InputRadio = ({name, control, label}) => {
    const generateRadioOptions = () => {
        return options.map((singleOption) => (
            <FormControlLabel
                key={Math.floor(Math.random()*100000)}
                value={singleOption.value}
                label={singleOption.label}
                control={<Radio />}
            />
        ));
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={''}
                render={({
                             field: { onChange, value },
                             fieldState: { error },
                             formState,
                         }) => (
                    <RadioGroup value={value} onChange={onChange}>
                        {generateRadioOptions()}
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};
