import React, { Component } from 'react';
import SearchTypeSelector from './SearchTypeSelector';
import './app/App.css';


class ApiSearchContainer extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isChecked: true,
            label: props.label,
            options: props.options,
        }
    }

    toggleCheckboxChange = () => {
        //const {handleDisable, label} = this.props;
        this.setState(({ isChecked }) => (
            {
              isChecked: !isChecked,
            }
          ));
          //handleDisable(label);
    }

    handleChange(eventTarget){
        //console.log(value);
        this.props.onChange(eventTarget)
    }

    render(){
        let {label, isChecked, options, selectedOption} = this.state;
        //console.log(options);
        return(
            <div className='ApiSearchContainer'>
                <label className="Search-items">
                    {label}
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />
                </label>
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