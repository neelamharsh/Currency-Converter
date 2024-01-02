import React from "react";
import { Box } from '@mui/material';
import GridBar from "../Utils/GridBar";
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    mainBox:{
        background:'#F2EAD3',
        height:'100vh',
        width:'20vw',
        minWidth:'300px',
        overflow:'auto',
        scrollbar:'hide',
        border:'2px solid black',
        borderRadius:'2px',
        margin:'1px',
    },    
    title:{
        fontWeight:'bold',
        fontSize:'20px',
        margin:'5px 10px 10px 10px',
    }
});

const Sidebar = ({data}) => {
    const classes = useStyles();
    return  <Box className={classes.mainBox}>
        <Box className={classes.title}>{"Top 100 Crypto Currency"}</Box>
        <Box className={classes.listStyle}>
            {
                data.map((d,i) => { 
                    return <Box key={i}> <GridBar e={d} key={i}/> </Box>
                })
            }
        </Box>
    </Box>
}


export default Sidebar;