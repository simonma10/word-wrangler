import {search} from './api-search';

/**
|--------------------------------------------------
| For each route, define an array of operations
| and descriptions
|--------------------------------------------------
*/
export const oxfordOperations = [
    {op: 'none', desc: 'Do not search this api'},
    {op: 'definitions', desc: 'Return definitions for a word'},
    {op: 'synonyms', desc: 'Synonyms'},
    {op: 'antonyms', desc: 'Fetches antonyms'}
]

export async function searchOxford(word, operation){
    let validation = ''
    oxfordOperations.forEach((item)=>{
        if(item.op === operation){
            validation = item.desc;
        }
    });
    if (validation === '') {
        return('Error - invalid operation: ' + operation);
    }
    let res = await search('oxford', word, operation);
    console.log('Oxford api result =', res);
    return res;
}