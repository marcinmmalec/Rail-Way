const express = require('express');
const app = express();
const port = 3001;
const unirest = require("unirest");
app.get('/api/associations/:word', (req, res) => {
    const request = unirest("GET", "https://twinword-word-associations-v1.p.rapidapi.com/associations/");
    request.query({ "entry": req.params.word });
    request.headers({
        "x-rapidapi-host": "twinword-word-associations-v1.p.rapidapi.com",
        "x-rapidapi-key": "53ef22d262msha107fd0580713eep115b0ejsn409e83a40dd4",
        "useQueryString": true
    });
    request.end(function (response) {
        if (response.error) {
            throw new Error(response.error);
        } 
        res.json(response.body.associations_scored || {});
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});