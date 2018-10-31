import React, { Component, Fragment } from 'react';
import './App.css';
import { searchWordnik, wordnikOperations, renderWordnikList} from '../../api-models/wordnik-api';
import { searchOxford, oxfordOperations, parseDefinitions, renderResponse} from '../../api-models/oxford-api';
import SearchForm from '../SearchForm';
//import SearchTypeSelector from '../SearchTypeSelector';
import ApiSearchContainer from '../ApiSearchContainer';
import { isTypeParameter } from 'babel-types';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchTypeSelectChange = this.handleSearchTypeSelectChange.bind(this);

    let wordnikOptions = [];
    wordnikOperations.forEach((item)=>{wordnikOptions.push(item.op)});
    let oxfordOptions = [];
    oxfordOperations.forEach((item)=>{oxfordOptions.push(item.op)});
    
    this.state = {
      wordnik:{
        label: "Wordnik",
        enabled:true,
        response:{data:[]},
        options: wordnikOptions,
        selectedOption: wordnikOptions[2]
      },
      oxford:{
        label:"Oxford",
        enabled:true,
        response:{data:[]},
        options:oxfordOptions,
        selectedOption: oxfordOptions[1]
      },
      searchTerm: ''
    };
  
  }

  async handleSearchSubmit(searchTerm) {
    this.setState({searchTerm});
    if(this.state.wordnik.enabled){
      this.setState({ wordnik: {...this.state.wordnik, response: await searchWordnik(searchTerm, this.state.wordnik.selectedOption)}}); 
    }
    if(this.state.oxford.enabled){
      this.setState({ oxford: {...this.state.oxford, response: await searchOxford(searchTerm, this.state.oxford.selectedOption)}}); 
    }

  }

  handleSearchTypeSelectChange(eventTarget){
    //console.log('app registers select option change:', eventTarget.value, ' on api:', eventTarget.name);
    let api = String(eventTarget.name).toLowerCase();
    let value = eventTarget.value;
    if (this.state[api]){
      this.setState({ [api]: {...this.state[api], selectedOption: value, response: {data:[]}} });      
    }
  }

  /* renderResponse(response){
    //let wordOperationsItem = wordOperations.find((item)=> {return item.op === this.state.selectedOperation})
    //return wordOperationsItem.render(response);
    switch(this.state.selectedOperation){
      case 'definitions':
        return this.renderDefinitions(response);
      case 'pronunciations':
        return this.renderPronunciation(response);
      case 'audio':
        return this.renderAudio(response);
      default:
        return (
        <div>
          <p>Not yet implemented. Check console for raw response details.</p>
        </div>)
    }
  }

  renderDefinitions(response){
    if(response === []) { return(<p>Loading...</p>) }
    const list = response.map((item, index) => 
      <li key={index}>{item.text}</li>
    )
    return (
      <div>
        {list.length > 0 && <h4>Definitions</h4>}
        <ul>{list}</ul>
      </div>
      
    )
  }
 */
  

  renderOxford(response){
    let {oxford} = this.state;
    if (response.data.length < 1) return;
    if (oxford.selectedOption==='definitions' && response.data[0].word){
      parseDefinitions(response);
      return renderResponse(response, oxford.selectedOption);
    }
    if ((oxford.selectedOption==='synonyms' ||
          oxford.selectedOption==='antonyms')
          && response.data[0].word){
      return renderResponse(response, oxford.selectedOption);
    }
    
    /* const entries = response.data[0].lexicalEntries[0].entries[0] || [];
    console.log('entries =', entries);
    const etymologies = entries.etymologies.map((item, index) =>
      <li key={index}>{item}</li>
    )
    const senses = entries.senses.map((item, index) =>
      <li key={index}>{item.definitions[0]}</li>

    )
    return (
      <div>
        {etymologies.length > 0 &&
          <Fragment>
            <h4>Oxford ({oxford.selectedOption})</h4>
            <p>Etymologies</p>
            <ul>{etymologies}</ul>
            <p>Definitions</p>
            <ul>{senses}</ul>
          </Fragment>
        }
      </div>
    ) */
  }


  renderWordnik(response){
    let {wordnik} = this.state;
    return renderWordnikList(response, wordnik.selectedOption);
  }

  render() {
    let {wordnik, oxford} = this.state;
    return (
      <div>
        <div className="Header">
          <ApiSearchContainer
            label={wordnik.label}
            options={wordnik.options}
            onChange={this.handleSearchTypeSelectChange}
            selectedOption={wordnik.selectedOption}
          ></ApiSearchContainer>
          <ApiSearchContainer
            label={oxford.label}
            options={oxford.options}
            onChange={this.handleSearchTypeSelectChange}
            selectedOption={oxford.selectedOption}
          ></ApiSearchContainer>



          <SearchForm onSubmit={this.handleSearchSubmit} />
        </div>
        <div className="Results">
          <h2>{this.state.searchTerm}</h2>
          {this.renderWordnik(wordnik.response)}
          {this.renderOxford(oxford.response)}
        </div>
      </div>
    );
  }
}

export default App;
