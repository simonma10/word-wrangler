import React, { Component } from 'react';
import './app/App.css';


class SearchForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }

    handleSubmit(event) {
        this.props.onSubmit(this.input.current.value);
        event.preventDefault();
      }

    render() {
        let searchText = '';
      return (
        <div className="Search">
            <form onSubmit={this.handleSubmit}>
                <label >
                    {searchText}
                    <input 
                        className="Search-input"
                        type="text"
                        placeholder="search"
                        ref={this.input}
                    />
                </label>
                    <input 
                        className="Search-submit"
                        type="submit"
                        value="Submit Search"
                    />
            </form>
        </div>
      )
    };

}

export default SearchForm;
