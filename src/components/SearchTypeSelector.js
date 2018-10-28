import React, { Component } from 'react';
import './app/App.css';

class SearchTypeSelector extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.select = React.createRef();
        this.state = {
            options: this.props.options || ['']
        }
    }

    handleChange(event){
        let eventTarget = event.target;
        this.props.onChange(eventTarget);
    }

    getOptions(){
        const options = this.state.options.map((option, index) => 
            <option key={index} value={option}>{option}</option>
        );
        return options;
    }

    render(){
        let state = this.state;

        return(
            <div className="Search">
               {/*  <span className="Search-items">Category:</span> */}

                <select
                    name={this.props.id}
                    value={this.props.value}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                >
                {this.getOptions()}
                </select>
            </div>
        )
    }
}

export default SearchTypeSelector;