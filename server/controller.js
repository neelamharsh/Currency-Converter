const express = require('express');

const router = express.Router();

router.post('/getAllCurrencyList', async (req,res) => {
    console.log("In getAllCurrencyList");
    const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    const apiKey = 'ffcba45b-1bd2-4bd1-95a1-9ecfb36a4d07';

    const requestOptions = {
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY': apiKey,
    },
    };

    try {
        const response = await fetch(apiUrl, requestOptions)
        const jsonResponse = await response.json();
        return res.status(200).json({resCode:200,data:jsonResponse.data});
    } catch(err) {
        return res.status(200).json({resCode:404,msg:err});
    }
});

router.post('/convert', async (req,res) => {
    console.log("In convert" , req.body);
    const {c,tc} = req.body;
    const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=' + tc;
    const apiKey = 'ffcba45b-1bd2-4bd1-95a1-9ecfb36a4d07';

    const requestOptions = {
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY': apiKey,
    },
    };

    try {
        const response = await fetch(apiUrl, requestOptions)
        const jsonResponse = await response.json();
        jsonResponse.data.map((d) => {
            if(d.symbol == c) {
                const dataString = JSON.stringify(d.quote);
                const priceString = dataString.split(",")[0].split(":")[2];
                return res.status(200).json({resCode:200,value:priceString});
            }
        })
    } catch(err) {
        return res.status(200).json({resCode:404,msg:err});
    }
});

module.exports = router;