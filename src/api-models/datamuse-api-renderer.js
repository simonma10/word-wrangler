import React, {Fragment} from 'react';
import {search} from './api-search';

/**
|--------------------------------------------------
| For each route, define an array of operations
| and descriptions
|--------------------------------------------------
*/
export const datamuseOperations = [
    {op: 'none', desc: 'Do not search this api'},
    {op: 'meansLike', desc: 'Returns words that have similar meanings'},
    {op: 'soundsLike', desc: 'Returns words that sound like the searched word'},
    {op: 'spelledLike', desc: 'Returns words that are spelled similarly'},
    {op: 'synonyms', desc: 'Fetches synonyms'},
    {op: 'triggers', desc: 'Fetches trigger words'}
]

export async function searchDatamuse(word, operation){
    let validation = ''
    datamuseOperations.forEach((item)=>{
        if(item.op === operation){
            validation = item.desc;
        }
    });
    if (validation === '') {
        return('Error - invalid operation: ' + operation);
    }
    let res = await search('datamuse', word, operation);
    //console.log('Datamuse api result =', res);
    return res;
}

export function renderDatamuseResult(response, selectedOption){
    let separator = ', ';
    if(response.data){
        const list = response.data.map((item, index) => 
            (
                <span key={index}>
                    {index < response.data.length - 1 ? <span>{item.word}{separator}</span> : <span>{item.word}</span>}
                </span>
            )
        )
        return(
            <div>
                {list.length > 0 && 
                <div>
                    <span className="Results-title">Datamuse ({selectedOption})</span>
                    <p>{list}</p>
                </div>
                }
            </div>
        )
        
    }
}

function renderWIP(response){
    return(
        <div>
            <p>Datamuse operation not implemented yet</p>
        </div>
    )
}

