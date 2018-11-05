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

//TODO: implement render methods for renderWIP
export function renderWordnikList(response, selectedOption){
    if(response){
        switch (selectedOption){
            case'audio':
                return renderAudio(response);
            case 'definitions': 
                return renderDefinition(response);
            case 'pronunciations':
                return renderPronunciation(response);
            case 'etymologies':
                return renderEtymology(response);
            case 'examples':
                return renderExamples(response);
            case 'frequency':
                return renderWIP(response);
            case 'hyphenation':
                return renderHyphenation(response);
            case 'phrases':
                return renderPhrase(response);
            case 'relatedWords':
                return renderRelated(response);
            case 'scrabbleScore':
                return renderScrabbleScore(response);
            case 'topExample':
                return renderWIP(response);
            default:
                break;
        }
    }
    
}

function renderTitle(option){
    return (
        <span className="Results-title">
            <span>Wordnik ({option})</span>
        </span>

    )
}


function renderDefinition(response) {
    const list = response.data.map((item, index) => 
      <li key={index}>
      ({item.partOfSpeech}), {item.text}</li>
    )
    return (
      <div>
        {list.length > 0 && renderTitle('definitions')}
        <ul>{list}</ul>
      </div>
      
    )
}


function renderPronunciation(response){
    const list = response.data.map((item, index) => 
      <li key={index}><strong>Type: </strong>{item.rawType||'unknown'}, <strong>Pronunciation: </strong>{item.raw||'unknown'}</li>
    )
    return (
      <div>
        {list.length > 0 && 
            renderTitle('pronunciation')}
        <ul>{list}</ul>
      </div>
      
    )
  }

function renderAudio(response){
    const list = response.data.map((item, index) => 
      <li key={index}><a type="audio/mpeg" target="frame" href={item.fileUrl||'#'}>{item.attributionText||'attribution unknown'}</a></li>
    )
    return (
      <div>
        {list.length > 0 && 
        <Fragment>
            {renderTitle('audio')}
          <ul>{list}</ul>
          <div className="audioFrame">
            <iframe title="Audio" name="frame" height="180px" width="400px"></iframe>
          </div>
        </Fragment>
        }
      </div>
    )
}

function renderEtymology(response){
      const list = response.data.map((item, index) => 
        <li key={index}>{item}</li>
        )
      return(
        <div>
            {list.length > 0 && 
            <Fragment>
            {renderTitle('etymology')}
            <ul>{list}</ul>
            </Fragment>
            }
        </div>
      )
}

function renderExamples(response){
    if(response.data.examples){
        const list = response.data.examples.map((item, index) => 
            (<li key={index}>
                <span>({item.year}){item.text}</span>
                <a href={item.url}>{item.title}</a>
            </li>)
        )
        return(
            <div>
                {list.length > 0 && 
                <Fragment>
                {renderTitle('examples')}
                <ul>{list}</ul>
                </Fragment>
                }
            </div>
        )
    }
}

function renderHyphenation(response){
    let separator = ' - ';
    const list = response.data.map((item, index) => 
      <span key={index}>
        {item.type ? <em>{item.text}</em> : <span>{item.text}</span>}
        {(index < response.data.length - 1) ? <span>{separator}</span> : ''}
      </span>
      )
    return(
      <div>
          {list.length > 0 && 
          <Fragment>
              {renderTitle('hyphenation')}
          <p>{list}</p>
          </Fragment>
          }
      </div>
    )
}

function renderPhrase(response) {
    const list = response.data.map((item, index) => 
      <li key={index}>
      {item.gram1}, {item.gram2}</li>
    )
    return (
      <div>
        {list.length > 0 && renderTitle('bi-gram phrases')}
        <ul>{list}</ul>
      </div>
      
    )
}

function renderRelated(response) {
    let separator = ', ';
    if(response.data){
        const list = response.data.map((item, index) => 
            <div key={index}>
                <span><em>{item.relationshipType}: </em></span>
                {renderWords(item)}
                
            </div> 
        )
        return (
        <div>
            {list.length > 0 && renderTitle('related')}
            <div>{list}</div>
        </div>
        
        )
    }
}

function renderWords(array){
    let separator = ', '
    const list = array.words.map((item, index) => 
      <span key={index}>
        {index < array.words.length -1 ? <span>{item}{separator}</span> : <span>{item}</span>}
      </span>
      
    )
    return (
      <span>
        {list.length > 0 && 
        <span>{list}</span>
        }
      </span>
      
    )
}

function renderScrabbleScore(response){
    if(response.data.value){
        return (
            <span>Scrabble Score: {response.data.value}</span>
        )
    }
}

function renderWIP(response){
    return(
        <div>
            <p>Wordnik operation not implemented yet</p>
        </div>
    )
}