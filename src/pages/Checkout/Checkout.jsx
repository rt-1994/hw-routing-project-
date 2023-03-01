import React from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styles from "./Checkout.scss";

function Checkout(props) {
    return (
            <Container maxWidth="sm">
                <h2>Ingredient info:</h2>
                <div className={styles.ingredients}>

                </div>
                <Typography variant="h4">Checkout info:</Typography>
                <form>
                    <div className={styles.formLine}>
                        <span>Name: </span>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <div className={styles.formLine}>
                        <span>Email: </span>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </div>
                    <div className={styles.formLine}>
                        <span>Choose delivery method: </span>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </div>
                    <div className={styles.formLine}>
                        <span>Additional notes: </span>
                    <TextField
                        id="message"
                        label="Message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        margin="normal"
                    />
                    </div>

                    <div className={styles.formLine}>
                        <span>Are you a regular client: </span>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Yes" />
                            <FormControlLabel value="male" control={<Radio />} label="No" />
                        </RadioGroup>
                    </div>

                    <div className={styles.formLine}>
                        <span>Do you have a coupon code: </span>
                        <FormControlLabel control={<Checkbox defaultChecked />}/>

                    </div>
                    <div className={styles.formLine}>
                        <span>Coupon: </span>
                        <TextField
                            id="name"
                            label="Coupon"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <div className={styles.formLine}>
                        <Button type="submit" variant="contained" color="primary">Reset</Button>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </div>

                </form>
            </Container>
    );
}

export default Checkout;