import {search} from './api-search';

/**
|--------------------------------------------------
| For each route, define an array of operations
| and description
|--------------------------------------------------
*/
export const wordnikOperations = [
    {op: 'none', desc: 'Do not search this api'},
    {op: 'audio', desc: 'Fetches audio metadata for a word'},
    {op: 'definitions', desc: 'Return definitions for a word'},
    {op: 'etymologies', desc: 'Fetches etymology data'},
    {op: 'examples', desc: 'Returns examples for a word'},
    {op: 'frequency', desc: 'Returns word usage over time'},
    {op: 'hyphenation', desc: 'Returns syllable information for a word'},
    {op: 'phrases', desc: 'Fetches bi-gram phrases for a word'},
    {op: 'pronunciations', desc: 'Returns text pronunciations for a given word'},
    {op: 'relatedWords', desc: 'Given a word as a string, returns relationships from the Word Graph'},
    {op: 'scrabbleScore', desc: 'Returns the Scrabble score for a word'},
    {op: 'topExample', desc: 'Returns a top example for a word'}
]

export async function searchWordnik(word, operation){
    let validation = ''
    wordnikOperations.forEach((item)=>{
        if(item.op === operation){
            validation = item.desc;
        }
    });
    if (validation === '') {
        return('Error - invalid operation: ' + operation);
    }
    let res = await search('wordnik', word, operation);
    console.log('wordnik=api result =', res);
    return res;
}
