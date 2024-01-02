import { Box, Button } from "@mui/material";
import { makeStyles } from '@mui/styles'
import React, { useState } from "react"
import ConverterInput from "./ConverterInput";

const exchangeCurrency = [
    { symbol:'USD'}, 
    { symbol:"EUR"},
    { symbol:"BTC"},
]

const useStyles = makeStyles({
    innerDiv:{
        margin:'10px',
        padding:'10px',
    },
    OuterDiv:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        //width:'60vw',
    }, 
    button:{
        margin:'10px',
    }
});

const Converter = ({currency}) => {
    const [values,setValues] = useState({currencyIndex:0,currencySymbol:'BTC', currencyValue:1});
    const [targetValue,setTargetValues] = useState({currencyIndex:0,currencySymbol:'USD', currencyValue:0});
    
    const fetchData = async (e) => {
        var api = "";
        if(process.env.NODE_ENV === 'development') api = 'http://localhost:8000/convert';
        else api = '/convert';

        var c = values.currencySymbol;
        var tc = targetValue.currencySymbol;

        const res = await fetch(api, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                c,tc
            })
        });
        const resp = await res.json();
        console.log(resp);
        if(resp.resCode === 200) {
            setTargetValues()
            setTargetValues({...targetValue,["currencyValue"]:(resp.value*values.currencyValue).toFixed(2)});
        }
    }

    React.useEffect(() => {
        fetchData();
      }, []);
    
    const classes = useStyles();

    return <Box className={classes.OuterDiv}>
        <Box className={classes.innerDiv}>
            <ConverterInput currency={currency} values={values} setValues={setValues} shouldDisable={false}/>
            <ConverterInput currency={exchangeCurrency} values={targetValue} setValues={setTargetValues} shouldDisable={true}/>
            <Box className={classes.button}><Button variant="contained" onClick={fetchData}>Convert</Button></Box>
        </Box>

    </Box>
}

export default Converter;