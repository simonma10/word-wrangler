import React, { Component, Fragment } from 'react';
import './App.css';
import { searchWordnik, wordnikOperations} from '../../api-models/wordnik-api';
import { searchOxford, oxfordOperations} from '../../api-models/oxford-api';
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
    console.log('app registers select option change:', eventTarget.value, 
    ' on api:', eventTarget.name);
    let api = String(eventTarget.name).toLowerCase();
    let value = eventTarget.value;
    if (this.state[api]){
      this.setState({ [api]: {...this.state[api], selectedOption: value} });      
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
  renderPronunciation(response){
    const list = response.map((item, index) => 
      <li key={index}><strong>Type: </strong>{item.rawType||'unknown'}, <strong>Pronunciation: </strong>{item.raw||'unknown'}</li>
    )
    return (
      <div>
        {list.length > 0 && <h4>Pronunciations</h4>}
        <ul>{list}</ul>
      </div>
      
    )
  }

  renderAudio(response){
    const list = response.map((item, index) => 
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

  renderOxford(response){
    if (response.data.length < 1) return;
    let {oxford} = this.state;
    const entries = response.data[0].lexicalEntries[0].entries[0] || [];
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
    )
  }


  renderWordnik(response){
    let {wordnik} = this.state;
    const list = response.data.map((item) => 
      <li key={item.sequence}>
        <span>{item.partOfSpeech} - </span>
        <span>{item.text}</span> 
      </li>
    );
    return (
      <div>
        {list.length > 0 &&
          <Fragment>
            <h4>Wordnik ({wordnik.selectedOption})</h4>
            <ul>{list}</ul>
          </Fragment>
        }
      </div>
    )
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
