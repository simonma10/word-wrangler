import axios from 'axios';

export function search(api, word, operation){
    let url = 'http://localhost:8080/' + api + '/' + operation + '/' + word;
    console.log(url);
    return axios.get(url)
        .then(function (response){
            console.log(api + ' response', response);
            return response;
        })
        .catch(function (error){
            console.log(error);
            return ['Error', error];
        })
}
