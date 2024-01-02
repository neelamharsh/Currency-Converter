import React from "react";
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    innerGrid:{
        fontWeight:'bold',
        display:'flex',
        justifyContent:'space-between',
    },
    mainBox:{
        background:'#DFD7BF',
        border:'solid 2px black',
        margin:'2px 5px 2px 5px',
        padding:'7px',
        borderRadius:'5px',
    }
});

const GridBar = (e, key) => {
    const classes = useStyles();
    return  <Box className={classes.mainBox}>

        <Box className={classes.innerGrid}>
            <Box>{e.e.name}</Box>
            <Box>{e.e.symbol}</Box>
        </Box>
        <Box>{(e.e.price).toFixed(2) + "$"}</Box>
    </Box>
}


export default GridBar;