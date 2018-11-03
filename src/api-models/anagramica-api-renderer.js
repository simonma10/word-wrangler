import React, {Fragment} from 'react';
import {search} from './api-search';

/**
|--------------------------------------------------
| For each route, define an array of operations
| and description
|--------------------------------------------------
*/
export const anagramicaOperations = [
    {op: 'none', desc: 'Do not search this api'},
    {op: 'all', desc: 'Returns all anagrams'},
    {op: 'best', desc: 'Returns best anagram'},
    {op: 'lookup', desc: 'Dictionary lookup...'}
]

export async function searchAnagramica(word, operation){
    let validation = ''
    anagramicaOperations.forEach((item)=>{
        if(item.op === operation){
            validation = item.desc;
        }
    });
    if (validation === '') {
        return('Error - invalid operation: ' + operation);
    }
    let res = await search('anagramica', word, operation);
    console.log('anagramica api result =', res);
    return res;
}

export function renderAnagramicaResult(response, selectedOption){
    if(response){
        switch (selectedOption){
            case'all':
                return renderAll(response);
            case 'best': 
                return renderBest(response);
            case 'lookup':
                return renderLookup(response);
            default:
                break;
        }
    }
    
}

function renderAll(response) {
    if(response.data.all){
        const list = response.data.all.map((item, index) => 
        <li key={index}>{item}</li>
      )
      return (
        <div>
          {list.length > 0 && <h4>Anagramica (all)</h4>}
          <ul>{list}</ul>
        </div>
        
      )
    }

}

function renderBest(response){
    return renderWIP(response);
}

function renderLookup(response){
    return renderWIP(response);
}


function renderWIP(response){
    return(
        <div>
            <p>Anagramica operation not implemented yet</p>
        </div>
    )
}