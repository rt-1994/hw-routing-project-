import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

export const InputText = ({ name, control, label, status }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={''}
            render={({
                         field: { onChange, value },
                         fieldState: { error },
                     }) => (
                <TextField
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    disabled={status ? false : true}
                />
            )}
        />
    );
};
