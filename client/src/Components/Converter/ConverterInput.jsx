import { Box, MenuItem, Select, TextField } from "@mui/material";
import React from "react"
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    textFieldStyle:{
        margin:'12px 20px 0px 0px !important',
        color:'blue',
    },
    selectStyle:{
        margin:'10px 10px 0px 10px',
    },
    outerDiv:{
        color:'white',
    }
});

const ConverterInput = ({currency, values, setValues, shouldDisable}) => {
    console.log(values);
    const onChangeHandle = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        if(name === 'currencyIndex') {
            var newValue = {...values};
            newValue.currencyIndex = value;
            newValue.currencySymbol = currency[value].symbol;
            setValues(newValue);
        } else {
            setValues({...values,[name]:value});
        }
    }
    const classes = useStyles();
    return <Box className={classes.outerDiv}>
        <Select className={classes.selectStyle} sx={{ borderColor:'black', color:'black', width: 150, height: 57 }} name={"currencyIndex"} value={values.currencyIndex} onChange={onChangeHandle}>
            {
                currency.map((c,i) => { 
                    return <MenuItem value={i} key={i}> {c.symbol} </MenuItem>
                })
            }

        </Select>
        {shouldDisable ? 
            <TextField className={classes.textFieldStyle} id="outlined-basic" label="Amount" variant="outlined" name={"currencyValue"} value={values.currencyValue} onChange={onChangeHandle} disabled sx={{ color:'black', "#outlined-basic":{ '-webkit-text-fill-color':'black'}}}/> :
            <TextField className={classes.textFieldStyle} id="outlined-basic" label="Amount" variant="outlined" name={"currencyValue"} value={values.currencyValue} type="number" onChange={onChangeHandle} sx={{"& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {display: "none"},"& input[type=number]": {MozAppearance:"textfield"}}}
            />
        }
        
    </Box> 
}

export default ConverterInput;