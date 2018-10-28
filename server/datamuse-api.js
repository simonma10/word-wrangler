var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../config');

const base_url = config.DATAMUSE_BASE_URL;

router.use(function timeLog (req, res, next) {
    console.log('>>> Datamuse API request <<< Time: ', new Date().toISOString());
    next();
})
// define the home page route
router.get('/', function (req, res) {
    res.send("Valid routes:\n /meansLike\n/soundsLike\n/spelledLike\n/synonyms\n/triggers\n But wait, there's more... https://www.datamuse.com/api/")
})

// meansLike
router.get('/meansLike/:word', function (req, res) {
    let url = base_url + '?ml=' + req.params["word"]
    callApi(url, res);
})

// soundsLike
router.get('/soundsLike/:word', function (req, res) {
    let url = base_url + '?sl=' + req.params["word"]
    callApi(url, res);
})

// spelledLike; supports wild cards * and ?
router.get('/spelledLike/:word', function (req, res) {
    let url = base_url + '?sp=' + req.params["word"]
    callApi(url, res);
})

// synonyms
router.get('/synonyms/:word', function (req, res) {
    let url = base_url + '?rel_syn=' + req.params["word"]
    callApi(url, res);
})

// triggers
router.get('/triggers/:word', function (req, res) {
    let url = base_url + '?rel_trg=' + req.params["word"]
    callApi(url, res);
})

function callApi(url, res){
    console.log(url);
    axios.get(url)
        .then(function (response){
            res.send(response.data);
        })
        .catch(function (error){
            if(error.response){
                console.log('ERROR: response data =', error.response.data);
                console.warn('STATUS:', error.response.status);
                console.log('HEADERS:', error.response.headers);
            } else if (error.request) {
                console.log('ERROR: request =', error.request);
            } else {
                console.log('ERROR:', error.message);
            }
            console.log('CONFIG:', error.config);
        })
}

module.exports = router