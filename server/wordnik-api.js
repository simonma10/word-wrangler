var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../config');

/**
|--------------------------------------------------
| API Connection data and data about routes
|--------------------------------------------------
*/
const base_url = config.WORDNIK_BASE_URL;
const api_key = config.WORDNIK_API_KEY;

router.use(function timeLog (req, res, next) {
    console.log('>>> Wordnik API request <<<', new Date().toISOString());
    next()
})

router.get('/', function (req, res) {
    res.send(
        'Valid routes:\n' +
        '/definitions/{word}        Return definitions for a word. \n' +
        '/audio/{word}              Fetches audio metadata for a word. \n' +
        '/etymologies/{word}        Fetches etymology data. \n' +
        '/examples/{word}           Returns examples for a word. \n' +
        '/frequency/{word}          Returns word usage over time. \n' +
        '/hyphenation/{word}        Returns syllable information for a word. \n' +
        '/phrases/{word}            Fetches bi-gram phrases for a word. \n' +
        '/pronunciations/{word}     Returns text pronunciations for a given word. \n' +
        '/relatedWords/{word}       Given a word as a string, returns relationships from the Word Graph. \n' +
        '/scrabble/{word}           Returns the Scrabble score for a word. \n' +
        '/topExample/{word}         Returns a top example for a word. \n' +
        'Refer to https://developer.wordnik.com/docs for more information'
    );
})

router.get('/:operation/:word', function (req, res) {
    let url = getUrl(req.params["operation"], req.params["word"]);
    callApi(url, res);
})

function getUrl(operation, word){
    return base_url + '/word.json/' + word + '/' + operation + '?api_key=' + api_key;
}

function callApi(url, res){
    console.log(url);
    axios.get(url)
        .then(function (response){
            switch(response.status){
                case 200:
                    res.send(response.data);
                    break;
                default:
                    console.log('Response code:', response.status, ', text: ', response.statusText)
                    res.send('Error ');
            }
            //res.send(response.data);
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