import React, { Component } from 'react';
import SearchTypeSelector from './SearchTypeSelector';
import './app/App.css';


class ApiSearchContainer extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            isChecked: true,
            label: props.label,
            options: props.options,
        }
    }

    toggleCheckboxChange = () => {
        const {onToggle} = this.props;
        this.setState(({ isChecked }) => (
            {
              isChecked: !isChecked,
            }
          ));
          this.handleToggle(this.state.label);
    }

    handleChange(eventTarget){
        //console.log(value);
        this.props.onChange(eventTarget)
    }

    handleToggle(eventTarget){
        this.props.onToggle(eventTarget)
    }

    render(){
        let {label, isChecked, options, selectedOption} = this.state;
        //console.log(options);
        return(
            <div className='ApiSearchContainer'>
                <div className="Search-items">
                <label >
                    {label}
                   
                </label>
                <input
                        display='flex'
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />
                </div>
                
                <SearchTypeSelector
                     options={options}
                     onChange={this.handleChange}
                     value={this.props.selectedOption}
                     disabled={!isChecked}
                     id={label}
                ></SearchTypeSelector>

            </div>
        )
    }

}

export default ApiSearchContainer;