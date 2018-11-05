import React from 'react';
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


/**
 * The Oxford API is a mystery wrapped within an enigma
 */
export function parseDefinitions(response){
    response.data.forEach((result) => {
        console.log('result:', result.word, result.type || '');
        result.lexicalEntries.forEach((lexicalEntry)=>{
            console.log('lexicalEntry:', lexicalEntry.text, lexicalEntry.lexicalCategory);

            if(lexicalEntry.entries) {
                lexicalEntry.entries.forEach((entry)=>{
                    console.log('entry:', entry.homographNumber || '');
                    if(entry.etymologies){
                        entry.etymologies.forEach((etymology)=>{
                            console.log('etymology:', etymology)
                        });
                    }
                    if (entry.senses){
                        entry.senses.forEach((sense)=>{
                            console.log(sense.id);
                            if(sense.definitions){
                                sense.definitions.forEach((definition)=>{
                                    console.log('definition:', definition)
                                })
                            }        
                        });
                    }
                });
            }
            if(lexicalEntry.pronunciations){
                lexicalEntry.pronunciations.forEach((pronunciation)=>{
                    console.log(pronunciation.audioFile || '');
                    console.log(pronunciation.phoneticNotation || '', pronunciation.phoneticSpelling || '');
                    //dialects
                    //regions
                });
            }
        })
    });
}

/**
 * Renders the API response
 */

export function renderResponse(response, operation){
  return response.data.map((result, index) => {
    return(
      <div key={index}>
        <span className="Results-title">Oxford ({operation})</span>
        {/* <p>{result.type}: {result.word}</p> */}
        {getLexicalEntries(result.lexicalEntries)}
      </div>
    )
  })
}

function getLexicalEntries(lexicalEntries) {
  return (
    lexicalEntries.map((lexicalEntry, index)=>{
      return(
        <div key={index}>
          <strong>{index+1}: {lexicalEntry.text + ' '}({String(lexicalEntry.lexicalCategory).toLowerCase()})</strong>
          {lexicalEntry.pronunciations ? getPronunciations(lexicalEntry.pronunciations) : ''}
          {getEntries(lexicalEntry.entries)}
        </div>
      )
    })
  );
}

//TODO: get server to download file in binary/octet-stream MIME type, then play audio from server fs
function getPronunciations(pronunciations){
  return(
    pronunciations.map((pronunciation, index)=>{
      return(
        <div key={index}>
            {pronunciation.audioFile ? 
              <span>
                Pronunciation{': '}
                <a type="audio/mpeg" target="oxAudioFrame" href={pronunciation.audioFile}>
                  {pronunciation.phoneticNotation ? pronunciation.phoneticNotation : ''}
                  {': '} 
                  {pronunciation.phoneticSpelling ? pronunciation.phoneticSpelling : ''}
                </a> 
              </span>: ''}
        </div>
      )
    })
  )
}

function getEntries(entries){
  return(
    entries.map((entry)=>{
      let {etymologies, senses} = entry;
      return(
        <div key={entry.homographNumber}>
          {getEtymologies(etymologies)}
          {getSenses(senses)}

        </div>
      )
    })
  )
}

function getEtymologies(etymologies){
  if (etymologies){
    return(
      etymologies.map((etymology, index)=>{
        return(
          <p key={index}>{etymology}</p>
        )
      })
    )
  }
}

function getSenses(senses){
  if (senses){
    return(
      senses.map((sense, index)=>{
        let {definitions, subsenses, examples, synonyms, antonyms} = sense;
        return(
          <div key={index}>
            <ul>
              {definitions ? definitions.map((definition, index)=>{
                return(
                  <li key={index}>
                    {definition}
                  </li>
                )
              }) : ''}
            </ul>
            <ul>{getSubsenses(subsenses)}</ul>
            <ul>{getExamples(examples)}</ul>
            <ul>{getSynonyms(synonyms)}</ul>
            <ul>{getAntonyms(antonyms)}</ul>
          </div>
        )
      })
    )
  }
}

function getSubsenses(subsenses){
  if(subsenses){
    return(
      subsenses.map((subsense, index)=>{
        let {definitions, synonyms, antonyms} = subsense;
        return(
          <ul key={index}>
            {definitions ? definitions.map((definition, index)=>{
              return(
                <li key={index}>{definition}</li>
              )
            }) : ''}
            {getSynonyms(synonyms)}
            {getAntonyms(synonyms)}

          </ul>
        )
      })
    )
  }
}

function getExamples(examples){
  if(examples){
    return(
      examples.map((example, index)=>{
        return(
          <ul key={index}>
            <li>
              <i>{example.text}</i>
            </li>
          </ul>
        )
      })
    )
  }
}

function getSynonyms(synonyms){
  if(synonyms){
    return(
      synonyms.map((synonym, index)=>{
        return(
          <ul key={index}>
            <li>
              <i>{synonym.text}</i>
            </li>
          </ul>
        )
      })
    )
  }
}

function getAntonyms(antonyms){
  return getSynonyms(antonyms);
}
