const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:string', (req,res) => {
    const searchString = req.params.string;
    console.log('search string: ', searchString, 'also api key: ', process.env.GIPHY_API_KEY);

    axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchString}&limit=6&offset=0&rating=g&lang=en`
    )
    .then(response => {
        res.send(response.data);
        console.log('response data from router: ', response.data);
    })
    .catch(error => {
        res.sendStatus(500);
    });
});


module.exports = router;