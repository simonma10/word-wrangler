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
        let searchText = 'Search: ';
      return (
        <div className="Search">
            <form onSubmit={this.handleSubmit}>
                <label >
                    {searchText}
                    <input className="Search-input" type="text" ref={this.input} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
      )
    };

}

export default SearchForm;
