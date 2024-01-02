import React, { useState } from "react";
import { Box } from '@mui/material';
import Sidebar from "./Sidebar/Sidebar";
import Converter from "./Converter/Converter";
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    mainBox:{
        background:'#F2EAD3',
        display:'flex',
    },
    title:{
        fontWeight:'bold',
        fontSize:'30px',
        margin:'5px 10px 0px 10px',
        textAlign:'right',
        right:'0px',
    }
});

const Home = () => {
    const [data, setData] = useState([]);
    React.useEffect(() => {
        const fetchData = async (e) => {
            var api = "";
            if(process.env.NODE_ENV === 'development') api = 'http://localhost:8000/getAllCurrencyList';
            else api = '/getAllCurrencyList';

            const res = await fetch(api, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const resp = await res.json();
            var tempData = [];
            if(resp.resCode === 200) {
                resp.data.map((d) => {
                    tempData.push({'name':d.name, 'symbol':d.symbol, price:d.quote.USD.price});
                    return 0
                })
            }
            setData(tempData);
        }

        fetchData();
        
      }, []);
    const classes = useStyles();
    return <Box className={classes.mainBox}>
        <Sidebar data={data}/>
        <Box sx={{width:'100%'}}>
            <Box className={classes.title}>Currency Converter</Box>
            <Converter currency={data}/>
        </Box>
    </Box>
}


export default Home;

