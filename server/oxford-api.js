var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../config');

const app_id = config.OED_APP_ID;
const app_key = config.OED_APP_KEY;
const base_url = config.OED_BASE_URL;

/**
|--------------------------------------------------
| https://developer.oxforddictionaries.com/documentation#/
|--------------------------------------------------
*/

router.use(function timeLog (req, res, next) {
    console.log('>>> Oxford API Server <<< Time: ', new Date().toISOString());
    next();
})
// define the home page route
router.get('/', function (req, res) {
    res.send('Valid routes:\n/definitions/{word}\n/synonyms/{word}\n/antonyms/{word}')
})

// definition
router.get('/definitions/:word', function (req, res) {
    let url = base_url + '/entries/en/' + req.params["word"]
    callApi(url, res);
})

// synonyms
router.get('/synonyms/:word', function (req, res) {
    let url = base_url + '/entries/en/' + req.params["word"] + '/synonyms'
    callApi(url, res);
})

// antonyms
router.get('/antonyms/:word', function (req, res) {
    let url = base_url + '/entries/en/' + req.params["word"] + '/antonyms'
    callApi(url, res);
})

// inflections
router.get('/inflections/:word', function (req, res) {
    let url = base_url + '/inflections/en/' + req.params["word"]
    callApi(url, res);
})


function callApi(url, res){
    axios.get(url, {
        headers: {
          app_id: app_id,
          app_key: app_key
        }
    })
        .then(function (response){
            res.send(response.data.results);
        })
        .catch(function (error){
            if(error.response){
                console.log('ERROR: response data =', error.response.data);
                console.warn('STATUS:', error.response.status);
                console.log('HEADERS:', error.response.headers);
                //res.send(error.response);
            } else if (error.request) {
                console.log('ERROR: request =', error.request);
            } else {
                console.log('ERROR:', error.message);
            }
            console.log('CONFIG:', error.config);
        })
}

module.exports = router