import React, {Fragment} from 'react';
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
    console.log('wordnik api result =', res);
    return res;
}

export function renderWordnikList(response, selectedOption){
    if(response){
        switch (selectedOption){
            case'audio':
                return renderAudio(response);
            case 'definitions': 
                return renderDefinition(response);
            case 'pronunciations':
                return renderPronunciation(response);
            default:
                break;
        }
    }
    
}

export function renderDefinition(response) {

    const list = response.data.map((item, index) => 
      <li key={index}>
      ({item.partOfSpeech}), {item.text}</li>
    )
    return (
      <div>
        {list.length > 0 && <h4>Wordnik (definitions)</h4>}
        <ul>{list}</ul>
      </div>
      
    )
}


export function renderPronunciation(response){
    const list = response.data.map((item, index) => 
      <li key={index}><strong>Type: </strong>{item.rawType||'unknown'}, <strong>Pronunciation: </strong>{item.raw||'unknown'}</li>
    )
    return (
      <div>
        {list.length > 0 && <h4>Wordnik (pronunciations)</h4>}
        <ul>{list}</ul>
      </div>
      
    )
  }

  export function renderAudio(response){
      console.log('rndr Audio', response)
    const list = response.data.map((item, index) => 
      <li key={index}><a type="audio/mpeg" target="frame" href={item.fileUrl||'#'}>{item.attributionText||'attribution unknown'}</a></li>
    )
    return (
      <div>
        {list.length > 0 && 
        <Fragment>
          <h4>Audio</h4>
          <ul>{list}</ul>
          <div className="audioFrame">
            <iframe title="Audio" name="frame" height="180px" width="400px"></iframe>
          </div>
        </Fragment>
        }
      </div>
    )
  }