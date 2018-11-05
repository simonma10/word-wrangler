import React, { Component } from 'react';
import './App.css';
import { searchWordnik, wordnikOperations, renderWordnikList} from '../../api-models/wordnik-api-renderer';
import { searchOxford, oxfordOperations, renderResponse} from '../../api-models/oxford-api-renderer';
import { searchAnagramica, anagramicaOperations, renderAnagramicaResult} from '../../api-models/anagramica-api-renderer';
import { searchDatamuse, datamuseOperations, renderDatamuseResult} from '../../api-models/datamuse-api-renderer';
import SearchForm from '../SearchForm';
import ApiSearchContainer from '../ApiSearchContainer';


class App extends Component {

  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchTypeSelectChange = this.handleSearchTypeSelectChange.bind(this);
    this.handleEnableToggle = this.handleEnableToggle.bind(this);

    let wordnikOptions = [];
    wordnikOperations.forEach((item)=>{wordnikOptions.push(item.op)});
    let oxfordOptions = [];
    oxfordOperations.forEach((item)=>{oxfordOptions.push(item.op)});
    let anagramicaOptions = [];
    anagramicaOperations.forEach((item)=>{anagramicaOptions.push(item.op)});
    let datamuseOptions = [];
    datamuseOperations.forEach((item)=>{datamuseOptions.push(item.op)});
    
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
      anagramica:{
        label: "Anagramica",
        enabled:true,
        response:{data:[]},
        options: anagramicaOptions,
        selectedOption: anagramicaOptions[1]
      },
      datamuse:{
        label: "Datamuse",
        enabled:true,
        response:{data:[]},
        options: datamuseOptions,
        selectedOption: datamuseOptions[1]
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
    if(this.state.anagramica.enabled){
      this.setState({ anagramica: {...this.state.anagramica, response: await searchAnagramica(searchTerm, this.state.anagramica.selectedOption)}}); 
    }
    if(this.state.datamuse.enabled){
      this.setState({ datamuse: {...this.state.datamuse, response: await searchDatamuse(searchTerm, this.state.datamuse.selectedOption)}}); 
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

  handleEnableToggle(eventTarget){
    //console.log('app registers enable toggle on api:', eventTarget);
    let api = String(eventTarget).toLowerCase();
    if (this.state[api]){
      this.setState({ [api]: {...this.state[api], enabled: !this.state[api].enabled, response: {data:[]}} });      
    }
  }

  renderOxford(response){
    let {oxford} = this.state;
    if(response.status===404 && response.data.length === 0){
      return (
        <div>Oxford: no data found</div>
      )
    }
    if (response.data.length < 1) return;
    if (response.data[0].word){
       return(
         <div className="Results-source">
          {renderResponse(response, oxford.selectedOption)}
        </div>
       ) 
    }
  }

  renderWordnik(response){
    let {wordnik} = this.state;
    if(response.status===200 && response.data.length === 0){
      return (
        <div>Wordnik: no data found</div>
      )
    }
    if(response.status){
      return (
        <div className="Results-source">
          {renderWordnikList(response, wordnik.selectedOption)}
        </div>
      )
    }

  }

  renderAnagramica(response){
    let {anagramica} = this.state;
    //console.log(response);
    if(response.status===200 && response.data.length === 0){
      return (
        <div>Anagramica: no data found</div>
      )
    }
    if(response.status){
      return (
        <div className="Results-source">
          {renderAnagramicaResult(response, anagramica.selectedOption)}
        </div>
      )
    }
  }

  renderDatamuse(response){
    let {datamuse} = this.state;
    console.log(response);
    if(response.status===200 && response.data.length === 0){
      return (
        <div>Datamuse: no data found</div>
      )
    }
    if(response.status){
      return (
        <div className="Results-source">
          {renderDatamuseResult(response, datamuse.selectedOption)}
        </div>
      )
    }
  }

  render() {
    let {wordnik, oxford, anagramica, datamuse} = this.state;
    return (
      <div>
        <div className="Header">
          <h1>Word Wrangler</h1>
          <SearchForm onSubmit={this.handleSearchSubmit} />
          <div className="Search-containers">
            <ApiSearchContainer
              label={wordnik.label}
              options={wordnik.options}
              onChange={this.handleSearchTypeSelectChange}
              onToggle={this.handleEnableToggle}
              selectedOption={wordnik.selectedOption}
            ></ApiSearchContainer>
            <ApiSearchContainer
              label={oxford.label}
              options={oxford.options}
              onChange={this.handleSearchTypeSelectChange}
              onToggle={this.handleEnableToggle}
              selectedOption={oxford.selectedOption}
            ></ApiSearchContainer>
            <ApiSearchContainer
              label={anagramica.label}
              options={anagramica.options}
              onChange={this.handleSearchTypeSelectChange}
              onToggle={this.handleEnableToggle}
              selectedOption={anagramica.selectedOption}
            ></ApiSearchContainer>
            <ApiSearchContainer
              label={datamuse.label}
              options={datamuse.options}
              onChange={this.handleSearchTypeSelectChange}
              onToggle={this.handleEnableToggle}
              selectedOption={datamuse.selectedOption}
            ></ApiSearchContainer>
          </div>
        </div>
        <div className="Results">
            {this.renderWordnik(wordnik.response)}
            {this.renderOxford(oxford.response)}
            {this.renderAnagramica(anagramica.response)}
            {this.renderDatamuse(datamuse.response)}
        </div>
      </div>
    );
  }
}

export default App;
