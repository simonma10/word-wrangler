var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../config');

const base_url = config.ANAGRAMICA_BASE_URL;

router.use(function timeLog (req, res, next) {
    console.log('>>> Anagramica API request <<< Time: ', new Date().toISOString());
    next();
})
// define the home page route
router.get('/', function (req, res) {
    res.send("Valid routes:\n /best\n/all\n/lookup\n http://www.anagramica.com")
})

// best
router.get('/best/:word', function (req, res) {
    let url = base_url + '/best/' + req.params["word"]
    callApi(url, res);
})

// all
router.get('/all/:word', function (req, res) {
    let url = base_url + '/all/' + req.params["word"]
    callApi(url, res);
})

// lookup
router.get('/lookup/:word', function (req, res) {
    let url = base_url + '/lookup/' + req.params["word"]
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